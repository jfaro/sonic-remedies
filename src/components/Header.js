import { Link } from 'react-router-dom';
import Navigation from './Navigation';

export default function Header() {
    return (
        <header className='header'>
            <Link to="/">
                <h2>Sonic Remedies</h2>
            </Link>

            <Navigation />
        </header>
    )
}
