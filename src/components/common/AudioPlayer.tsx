import { Button } from "antd";
import { PlayCircleOutlined, PauseOutlined } from "@ant-design/icons";
import { useAudio } from "../../hooks/useAudio";

interface IProps {
    url: string;
};

export default function AudioPlayer({ url }: IProps) {
    const { playing, toggle } = useAudio(url);

    return (
        <Button
            type="primary"
            size="large"
            shape="circle"
            onClick={toggle}
            icon={playing ? <PauseOutlined /> : <PlayCircleOutlined />}
        />
    )
}
