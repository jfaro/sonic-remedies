import { useState } from 'react';
import { Space, Typography, Menu } from "antd";
import { PlayCircleOutlined, QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import MusicTable from "../components/MusicTable";
import AllSurveys from '../components/survey/AllSurveys';
import AllQuestionSets from "../components/questionsets/AllQuestionSets";
import CreateSurvey from "../components/survey/CreateSurvey";
import CreateQuestionSet from "../components/questionsets/CreateQuestionSet";

const { Title } = Typography;


export default function Admin() {
    const [current, setCurrent] = useState('tracks');

    const items = [
        {
            label: 'Uploaded Tracks',
            key: 'tracks',
            icon: <PlayCircleOutlined/>,
        },
        {
            label: 'Question Sets',
            key: 'qsets',
            icon: <QuestionCircleOutlined />,
        },
        {
            label: 'Surveys',
            key: 'surveys',
            icon: <InfoCircleOutlined />,
        }
    ];

    const onClick = (e) => {
        setCurrent(e.key);
    };

    function QuestionSets() {
        return(
            <p>
                <Title level={3}>Question Sets</Title>
                <Space direction='vertical' size='large'>
                    <CreateQuestionSet />
                    <AllQuestionSets></AllQuestionSets>
                </Space> 
            </p>
        );
    }

    function Surveys() {
        return(
            <p>
                <Title level={3}>Surveys</Title>
                <Space direction='vertical' size='large'>
                    <CreateSurvey />
                    <AllSurveys></AllSurveys>
                </Space> 
            </p>
        );
    }

    function Tracks() {
        return(
            <p>
                <Title level={3}>Uploaded Tracks</Title>
                <MusicTable /> 
            </p>
        );
    }

    function AdminPage() {
        if (current === 'tracks') {
            return <Tracks></Tracks>
        } else if ( current === 'qsets') {
            return <QuestionSets></QuestionSets>
        } else {
            return <Surveys></Surveys>
        }
    }

    return (
        <div className="flex-col w-100">
            <p>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </p>
            
            <AdminPage></AdminPage>
        </div>
    )
}
