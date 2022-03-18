import { Table } from 'antd';
import { onSnapshot, query, collection, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useState } from 'react';

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
    const database = getFirestore();
    const storage = getStorage();
    const songData = query(collection(database, "songs"));
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);

    const columns = [
        {
            title: 'File Name',
            dataIndex: 'filename',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.filename.localeCompare(b.filename),
            render: (filename, row) => <a href={row.url}>{filename}</a>
        },
        {
            title: 'Track Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Track Length',
            dataIndex: 'length',
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            sorter: (a, b) => a.artist.localeCompare(b.artist),
        },
        {
            title: 'Album Title',
            dataIndex: 'album',
            sorter: (a, b) => a.album.localeCompare(b.album), 
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            // filter?
        },
        {
            title: 'Track Tempo',
            dataIndex: 'tempo',
            sorter: (a, b) => a.tempo - b.tempo,
        },
        {
            title: 'Key and Mode',
            dataIndex: 'key',
            // filter
        },
        {
            title: 'Texture',
            dataIndex: 'texture',
            // filter
        },
        {
            title: 'Improvisation',
            dataIndex: 'improv',
            // filter
        },
        {
            title: 'Added By',
            dataIndex: 'admin',
            // filter
        },
        {
            title: 'Date Added',
            dataIndex: 'timeAdded',
            sorter: (a, b) => a.tempo - b.tempo,
            // filter
        },
        {
            title: "Download Link",
            dataIndex: "url",
            key: "url"
        },
    ].filter(col => col.dataIndex !== 'url');
 
    onSnapshot(songData, (snapshot) => {
        let songList = [];
        snapshot.forEach((doc) => {
            songList.push(doc.data());
        });
        if(songList.length !== songs.length)
        {
            setSongs(songList);
        }
        if (loading === true)
        {
            setLoading(false);
        }
        console.log(songs);
    });

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
        />
    )
}
