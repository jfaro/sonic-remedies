import { Layout } from 'antd';
import Footer from './Footer';
import Header from './Header';

export default function PageLayout({ children }) {
    return (
        <Layout className='app'>
            <div className='page-content'>
                <Header />
                <div className='flex-grow'>
                    {children}
                </div>
                <Footer />
            </div>
        </Layout >
    )
}
