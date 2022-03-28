import { Layout } from 'antd';
import Header from './Header';
import PagePathViewer from './PagePathViewer';

export default function PageLayout({ children }) {

    return (
        <Layout className='app'>
            <div className='page-content'>
                <Header />
                <PagePathViewer />
                <div className='page-center'>
                    {children}
                </div>
            </div>
        </Layout >
    )
}
