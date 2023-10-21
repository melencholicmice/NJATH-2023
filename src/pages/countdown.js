import { React, useEffect, useState } from "react";
import styles from "@/styles/countdown.module.css";
import Link from "next/link";

export default function Countdown() {
    const [time, setTime] = useState(`${0} Days, ${0} Hours, ${0} Minutes and ${0} Seconds`);

    useEffect(() => {
        let deadline = Date.parse("oct 28, 2022 00:00:00");
        if (deadline - Date.now() < 0) setTime(0);
        else {
            setTimeout(() => {
                let t = deadline - Date.now();
                let days = Math.floor(t / (1000 * 60 * 60 * 24));
                let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((t % (1000 * 60)) / 1000);
                setTime(`${days} Days, ${hours} Hours, ${minutes} Minutes and ${seconds} Seconds`);
            }, 1000);
        }
    }, []);
    return (
        <>
            <div className="aurora-background blurred" />
            <div className={styles.mainContainer}>
                <div className={styles.titleBox}>
                    {/* Title Box */}
                    <div className={styles.title}>
                        <span>N. J. A. T. H.</span>
                        <br /> <br />
                        Not Just Another Treasure Hunt
                    </div>

                    {time != 0 && <div className={styles.timer}>{time}</div>}
                    {time == 0 && (
                        <div className={styles.links}>
                            <Link className={styles.button} href="/register">
                                Register
                            </Link>
                            <Link className={styles.button} href="/login">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
