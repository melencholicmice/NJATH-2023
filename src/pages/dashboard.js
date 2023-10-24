import React from "react";
import styles from "@/styles/dashboard.module.css";
import { Navbar } from "@/componenets";

export default function Dashboard() {
    return (
        <>
            <div className="aurora-background" />
			<Navbar/>
            <div className={styles.mainContainer}>
                
			</div>
        </>
    );
}
