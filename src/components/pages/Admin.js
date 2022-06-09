import { useState } from 'react';
import { Space, Typography, Menu } from "antd";
import { PlayCircleOutlined, QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import MusicTable from "../admin/MusicTable";
import AllSurveys from '../admin/surveys/AllSurveys';
import CreateSurvey from "../admin/surveys/CreateSurvey";
import CreateQuestionSet from "../admin/questionsets/CreateQuestionSet";
import AllQuestionSets from "../admin/questionsets/AllQuestionSets";

const { Title } = Typography;

/**
 * Code that runs the entirety of the Administrative back end of the site.
 * The admin site is broken into three sections in order - tracks, question sets, and surveys.
 */
export default function Admin() {
    const [current, setCurrent] = useState('tracks');

    /* [TEMPORARILY DEPRECIATED UNTIL WE MOVE TO antd >4.20] Menu options.
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
    */

    const onClick = (e) => {
        setCurrent(e.key);
    };

    // Code for the question set part of the admin menu.
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

    // Code for the survey part of the admin menu.
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

    // Code for the music track part of the admin menu.
    function Tracks() {
        return(
            <div>
                <Title level={3}>Uploaded Tracks</Title>
                <MusicTable /> 
            </div>
        );
    }

    // Conditionally renders one of the three parts of the admin menu based on what was selected in the menu
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
            
            <Menu mode="horizontal" onClick={onClick}>
                <Menu.Item icon={<PlayCircleOutlined/>} key="tracks">Uploaded Tracks</Menu.Item>
                <Menu.Item icon={<QuestionCircleOutlined />} key="qsets">Question Sets</Menu.Item>
                <Menu.Item icon={<InfoCircleOutlined />} key="surveys">Surveys</Menu.Item>
            </Menu>
            {/**
             * TODO: Ok, this one's a doozy. I could've sworn this menu code worked, but apparently we're on antd 4.19.2? And the below code is antd >4.20 
             * Anyways, the menu code above *works*, but I don't know why the below code stoped working.
             * <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
             */}
             <p></p>
            <AdminPage></AdminPage>
        </div>
    )
}
