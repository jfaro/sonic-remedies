import { Layout } from 'antd';
import Header from './Header';

export default function PageLayout({ children }) {
    return (
        <Layout className='app'>
            <Layout className='page-content'>
                <Header />
                <Layout className='flex-col w-100 flex-center'>
                    {children}
                </Layout>
            </Layout>
        </Layout >
    )
}
