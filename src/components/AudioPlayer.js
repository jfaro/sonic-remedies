import React from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseOutlined } from '@ant-design/icons';
import useAudio from '../hooks/useAudio';
import song from '../audio/so-so-lovely.mp3';

export default function AudioPlayer() {
    const [playing, toggle] = useAudio(song);

    const track = {
        title: 'So So Lovely',
        artist: 'Shigeto',
    }

    return (
        <div
            className="card"
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
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
