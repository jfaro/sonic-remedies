import React from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseOutlined } from '@ant-design/icons';
import useAudio from '../hooks/useAudio';

export default function AudioPlayer({song, artist, url, orientation}) {
    const [playing, toggle] = useAudio(new URL(url));

    const track = {
        title: song,
        artist: artist,
    }

    return (
        <div
            className="card"
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: orientation,
                alignItems: 'center',
                gap: 10,
            }}>
            <h2>{track.title}</h2>
            <h3>{track.artist}</h3>
            <Button
                type='primary'
                size='large'
                shape="circle"
                onClick={toggle}
                icon={playing ? <PauseOutlined /> : <PlayCircleOutlined />}>
            </Button>
        </div>
    )
}
