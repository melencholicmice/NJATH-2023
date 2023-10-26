import React from "react";
import styles from "./navbar.module.css";
import { Lemonada } from "next/font/google";
import Link from "next/link";

const lemonada = Lemonada({
    subsets: ["latin"],
    weight: "600",
});

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.title + " " + lemonada.className}>N. J. A. T. H.</div>
            {/* <div className={`${styles.title} ${lemonada.className}`}>N. J. A. T. H.</div> */}
            <div className={styles.links}>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/">Leaderboard</Link>
                <Link href="/login">Logout</Link>
            </div>
        </div>
    );
}
