import { Button } from "antd";
import { PlayCircleOutlined, PauseOutlined } from "@ant-design/icons";
import useAudio from "../../hooks/useAudio";

export default function AudioPlayer({ url }) {
    const [playing, toggle] = useAudio(new URL(url));

    return (
        <Button
            type="primary"
            size="large"
            shape="circle"
            onClick={toggle}
            icon={playing ? <PauseOutlined /> : <PlayCircleOutlined />}>
        </Button>
    )
}
