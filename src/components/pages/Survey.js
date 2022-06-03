import { useAllDocuments } from "../../hooks/useAllDocuments";
import { Divider, Spin } from "antd";
import { CollectionNames } from "constants/firebase";
import AudioPlayer from "../common/AudioPlayer";
import { SurveyForm } from "../user-survey/SurveyForm";

export default function Survey() {
    const { documents: songs, isLoading } = useAllDocuments(CollectionNames.Songs);

    if (isLoading) {
        return <Spin />;
    }

    const randomSongIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomSongIndex];
    const { title, artist, url } = randomSong;

    console.log(songs);

    return (
        <div className="flex-col flex-center w-100 h-100">
            <div className="card" style={{ maxWidth: '600px' }}>
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
