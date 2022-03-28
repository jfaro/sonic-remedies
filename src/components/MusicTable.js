import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { db } from '../services/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

/**
 * This component, MusicTable, is used as part of the administrative half of the site.
 * It is used to display the song database to the administrator.
 * TODOs:
 *    - Add filtering to the table
 * 
 * ANDREW NOTE:
 * Hello future programmers! Yes, I know my use of React state here is atrocious, 
 * especially when combined with the Firestore onSnapshot() function. Is there a better way
 * to have these work that doesn't rerender like 10 times? I don't know! Good luck!
 */
export default function MusicTable() {
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);

    // Get data on mount
    useEffect(() => {
        const songsList = [];
        const songsQuery = query(collection(db, 'songs'));

        const unsubscribe = onSnapshot(songsQuery, (snapshot) => {
            snapshot.forEach((doc) => {
                songsList.push({
                    ...doc.data(),
                    key: doc.id,
                });
            })
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
        },
        {
            title: 'Tempo',
            dataIndex: 'tempo',
            sorter: (a, b) => a.tempo - b.tempo,
        },
        {
            title: 'Key / Mode',
            dataIndex: 'key'
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
            dataIndex: 'admin'
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
