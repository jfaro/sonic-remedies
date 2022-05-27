import { Divider, Spin } from "antd";
import { useAllSongs } from "../../hooks/useAllSongs";
import AudioPlayer from "../common/AudioPlayer";
import { SurveyForm } from "../user-survey/SurveyForm";
import styles from "./Survey.module.css";

export default function Survey() {
    const [songs, isLoading] = useAllSongs();

    if (isLoading) {
        return <Spin />;
    }

    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const { title, artist, url } = randomSong;

    console.log(songs);

    return (
        <div className="flex-col flex-center w-100 h-100">
            <div className={styles.surveyContainer}>
                <div className="flex-col flex-center w-100">
                    <AudioPlayer
                        title={title}
                        artist={artist}
                        url={url} />
                </div>
                <Divider />
                <SurveyForm />
            </div>
        </div>
    )
}
