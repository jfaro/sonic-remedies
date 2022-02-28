import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className='layout'>
            <Header />
            <div className='page-content'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
