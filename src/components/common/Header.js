import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/">
                <h2>Sonic Remedies</h2>
            </Link>

            <Navigation />
        </header>
    )
}
