import { Table } from 'antd';
import { getDatabase, ref, onValue} from "firebase/database";
import { useState } from 'react';
import moment from 'moment';

/**
 * This component, MusicTable, is used as part of the administrative half of the site.
 * It is used to display the song database to the administrator.
 * TODOs:
 *    - Add filtering to the table
 */
export default function MusicTable() {
    const database = getDatabase();
    const piecesRef = ref(database, 'pieces/');
    const [loading, setLoading] = useState(true);
    const [pieces, setPieces] = useState([]);


    const columns = [
        {
            title: 'File Name',
            dataIndex: 'filename',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.filename.localeCompare(b.filename),
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
    ];
 
    onValue(piecesRef, (snapshot) => {
        if(snapshot.hasChildren())
        {
            const data = snapshot.val();
            const pieceArray = processPieces(data);
            if (pieceArray.length !== pieces.length)
            {
                setPieces(pieceArray);
            }
            if (loading === true)
            {
                setLoading(false);
            }   
            console.log(pieces);
        }
    });

    function processPieces(data) {
        let tempPieces = [];
        Object.values(data).forEach(val => tempPieces.push(val));
        return tempPieces;
    };

    // Temporary function, remove later.
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <Table 
            columns={columns} 
            dataSource={pieces} 
            loading={loading}
            onChange={onChange} 
        />
    )
}
