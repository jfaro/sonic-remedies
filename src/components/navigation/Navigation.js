import { useState } from "react";
import { Button } from "antd";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/firebase";
import { getAuth, signOut } from "firebase/auth";
import styles from "./Navigation.module.css";

export default function Navigation() {
    const { user, isAuthenticated, isAdmin } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onLoginPage = useMatch("/login");
    const onSurveyPage = useMatch("/survey");

    async function handleLogout() {
        setLoading(true);
        try {
            await signOut(getAuth());
            console.log("Sign-out successful.")
        } catch (error) {
            console.log("An error happened.")
        }
        setLoading(false);
        navigate("/");
    }

    // Show login button if no user is logged in
    // Don"t render login button if on login page
    // Show logout button if a user is logged in
    let loginLogoutButton = null;

    if (!user && !onLoginPage) {
        loginLogoutButton = (
            <Link to="/login">
                <Button type="ghost">Login</Button>
            </Link>);
    } else if (user) {
        loginLogoutButton = (
            <Button
                type="ghost"
                onClick={handleLogout}
                loading={loading}>
                Logout
            </Button>
        )
    }

    return (
        <nav className={styles.navigation}>
            {!onSurveyPage &&
                <Link to="/survey">
                    <Button type="text">Survey</Button>
                </Link>
            }
            {loginLogoutButton}
            {isAuthenticated && isAdmin ?
                <Link to="/admin">
                    <Button type="primary">Admin</Button>
                </Link> : null}
        </nav>
    )
}
