import { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { db } from '../services/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

/**
 * This component, MusicTable, is used as part of the administrative half of the site.
 * It is used to display the song database to the administrator.
 */
export default function MusicTable() {
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [admins, setAdmins] = useState([]);

    // Get data on mount
    useEffect(() => {
        const songsList = [];
        const adminList = [];
        const songsQuery = query(collection(db, 'songs'));

        const unsubscribe = onSnapshot(songsQuery, (snapshot) => {
            snapshot.forEach((doc) => {
                // Song List
                songsList.push({
                    ...doc.data(),
                    id: doc.id,
                    key_signature: doc.data().key_signature[0] + " " + doc.data().key_signature[1],
                });

                // Admin filtering
                const ad = doc.data().admin;
                if(adminList.indexOf(ad) === -1)
                {
                    adminList.push(ad);
                }
            });

            const tempAdmin = [];
            adminList.forEach((admin) => {
                tempAdmin.push({
                    text: admin,
                    value: admin, 
                });
            });

            setAdmins(tempAdmin);
            setSongs(songsList);
            setLoading(false);
        })

        return () => unsubscribe();
    }, [])

    const columns = [
        {
            title: 'Title',
            fixed: 'left',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (title, row) => <a href={row.url}>{title}</a>
        },
        {
            title: 'Length',
            dataIndex: 'length',
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            sorter: (a, b) => a.artist.localeCompare(b.artist),
        },
        {
            title: 'Album',
            dataIndex: 'album',
            sorter: (a, b) => a.album.localeCompare(b.album),
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            render: tags => (
                <>
                  {tags.map(tag => {
                    return (
                      <Tag color={'geekblue'} key={tag}>
                        {tag}
                      </Tag>
                    );
                  })}
                </>
              ),
        },
        {
            title: 'Tempo',
            dataIndex: 'tempo',
            sorter: (a, b) => a.tempo - b.tempo,
        },
        {
            title: 'Key / Mode',
            dataIndex: 'key_signature'
        },
        {
            title: 'Texture',
            dataIndex: 'texture'
        },
        {
            title: 'Improvisation',
            dataIndex: 'improv'
        },
        {
            title: 'Added By',
            dataIndex: 'admin',
            filters: admins,
            onFilter: (value, record) => record.admin.indexOf(value) === 0,
        },
        {
            title: 'Date Added',
            dataIndex: 'timeAdded',
            sorter: (a, b) => a.tempo - b.tempo,
        },
        {
            title: "Download Link",
            dataIndex: "url",
            key: "url"
        },
    ].filter(col => col.dataIndex !== 'url');

    // Temporary function, remove later.
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <Table
            columns={columns}
            dataSource={songs}
            loading={loading}
            onChange={onChange}
            pagination={false}
            size='small'
            scroll={{ y: 240, x: 1600 }}
        />
    )
}
