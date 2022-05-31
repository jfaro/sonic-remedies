import Header from "../common/Header";
import PagePathViewer from "../PagePathViewer";
import styles from "./PageLayout.module.css";

export default function PageLayout({ children }) {

    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.pageContent}>
                <PagePathViewer />
                <div className={styles.pageCenter}>
                    {children}
                </div>
            </div>
        </div >
    )
}
