import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';

export default function PageLayout({ children }) {
    return (
        <Layout className='app'>
            <Layout className='page-content'>
                <Header />
                <Layout className='h-100 w-100 flex-col flex-center'>
                    {children}
                </Layout>
                <Footer />
            </Layout>
        </Layout >
    )
}
