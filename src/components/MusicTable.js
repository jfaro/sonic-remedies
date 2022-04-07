import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { db } from '../services/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { deleteData } from '../services/delete';
import moment from 'moment';
import UploadTrack from './UploadTrack';
import AudioPlayer from './AudioPlayer';

/**
 * This component, MusicTable, is used as part of the administrative half of the site.
 * It is used to display the song database to the administrator.
 */
export default function MusicTable() {
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [playing, setPlaying] = useState([]);

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
                    timeAdded: moment(doc.data().timeAdded, moment.ISO_8601).format("M/D/YYYY, h:mm:ss a"),
                    length: secondsToTime(doc.data().length)
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
    }, [loading]);

    /**
     * Returns a tag for a green check or red X for the texture and improv columns
     * @param {Boolean} props with one value, .isTrue
     * @returns {Tag} of AntDesign two-tone icons CheckCircle or CloseCircle
     */ 
    function Checkmark(props)
    {
        if (props.isTrue) {
            return <CheckCircleTwoTone twoToneColor="#52c41a"/>
        } else {
            return <CloseCircleTwoTone twoToneColor="#f5222d"/>
        }
    }

    /**
     * Hides the audio player until "Play Song" is clicked
     * @returns {AudioPlayer} if the length of the playing data array is non-zero, else null
     */
    function ChartPlayer()
    {
        if (playing.length !== 0) {
            return <AudioPlayer song={playing[0]} artist={playing[1]} url={playing[2]} orientation={'row'}></AudioPlayer>
        } else {
            return null;
        }
    }

    /**
     * Converts between total seconds of a song's length into a mm:ss format
     * @param {Integer} sec 
     * @returns {string} of human formatted minutes:seconds format
     */
    function secondsToTime(sec){
        if(typeof sec !== 'number')
        {
            return "-";
        }

        var m = Math.floor(sec / 60).toString().padStart(2,'0'),
            s = Math.floor(sec % 60).toString().padStart(2,'0');
        
        return m + ':' + s;
    }

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
            sorter: (a, b) => a.length.localeCompare(b.length),
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
            title: 'Consistent Texture',
            dataIndex: 'texture',
            render: value => (<Checkmark isTrue={value}></Checkmark>)
        },
        {
            title: 'Improvisation',
            dataIndex: 'improv',
            render: value => (<Checkmark isTrue={value}></Checkmark>)
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
            sorter: (a, b) => a.timeAdded.localeCompare(b.timeAdded),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <a onClick={() => setPlaying([record.title,record.artist,record.url]) }>Play Song</a>
                <a onClick={() => deleteData(record)} style={{color: "#f5222d"}}>Delete</a>
              </Space>
            ),
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
        <div>
            <Space size="middle">
                <UploadTrack />
                <Button onClick={() => setLoading(true)}>Reload Table</Button>
                <ChartPlayer></ChartPlayer>
            </Space>
            <p></p>
            <Table
                columns={columns}
                dataSource={songs}
                loading={loading}
                onChange={onChange}
                pagination={false}
                rowKey='id'
                size='small'
                scroll={{ y: 240, x: 1600 }}
            />
        </div>
        
    )
}
