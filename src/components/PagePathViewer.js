import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    '/': 'Home',
    '/admin': 'Admin Dashboard',
    '/login': 'Login',
    '/survey': 'Survey'
};

export default function PagePathViewer() {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <div className='w-100'>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
    )
}
