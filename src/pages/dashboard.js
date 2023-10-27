import React from "react";
import styles from "@/styles/dashboard.module.css";
import { Navbar } from "@/components";

export default function Dashboard() {
    return (
        <>
            <div className="aurora-background" />
			<Navbar/>
            <div className={styles.mainContainer}>
                This is DashBoard
			</div>
        </>
    );
}
