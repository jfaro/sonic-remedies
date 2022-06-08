import { useState } from 'react';
import { Space, Typography, Menu } from "antd";
import { PlayCircleOutlined, QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import MusicTable from "../admin/MusicTable";
import AllSurveys from '../admin/surveys/AllSurveys';
import CreateSurvey from "../admin/surveys/CreateSurvey";
import CreateQuestionSet from "../admin/questionsets/CreateQuestionSet";
import AllQuestionSets from "../admin/questionsets/AllQuestionSets";
import styles from "./Admin.module.css";

const { Title } = Typography;


export default function Admin() {
    const [current, setCurrent] = useState('surveys');

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
            <div>
                <Title level={3}>Question Sets</Title>
                <Space direction='vertical' size='large'>
                    <CreateQuestionSet />
                    <AllQuestionSets></AllQuestionSets>
                </Space> 
            </div>
        );
    }

    function Surveys() {
        return(
            <div>
                <Title level={3}>Surveys</Title>
                <Space direction='vertical' size='large'>
                    <CreateSurvey />
                    <AllSurveys></AllSurveys>
                </Space> 
            </div>
        );
    }

    function Tracks() {
        return(
            <div>
                <Title level={3}>Uploaded Tracks</Title>
                <MusicTable /> 
            </div>
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
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <AdminPage></AdminPage>
        </div>
    )
}
