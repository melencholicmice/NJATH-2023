import { React, useEffect, useState } from "react";
import styles from "@/styles/home.module.css";
import Draggable from "react-draggable";
import { useRouter } from "next/router";

export default function Home() {
    const pos = { x: 0.5, y: 0.5 };
    const [controlledPosition, setPosition] = useState({ x: 0.5, y: 0.5 });
    let router = useRouter();

    const saveCursorPosition = function (x, y) {
        pos.x = (x / window.innerWidth).toFixed(3);
        pos.y = (y / window.innerHeight).toFixed(3);
        try {
            const trackerElem = document.getElementsByClassName(styles.tracker).item(0);
            if (pos.x > 0.75 || pos.x < 0.25 || pos.y > 0.75 || pos.y < 0.25) {
                trackerElem.classList.add(styles.out);
                trackerElem.classList.remove(styles.in);
            } else if (pos.x > 0.725 || pos.x < 0.275 || pos.y > 0.725 || pos.y < 0.275) {
                trackerElem.classList.remove(styles.out);
                trackerElem.classList.add(styles.in);
            } else {
                trackerElem.classList.remove(styles.in);
                trackerElem.classList.remove(styles.out);
            }
        } catch (error) {
            console.log("Page Loaded before HTML");
        }

        document.documentElement.style.setProperty("--x", pos.x);
        document.documentElement.style.setProperty("--y", pos.y);
    };

    useEffect(() => {
        document.documentElement.style.setProperty("--x", pos.x);
        document.documentElement.style.setProperty("--y", pos.y);
        document.addEventListener("mousemove", (e) => {
            saveCursorPosition(e.clientX, e.clientY);
        });
    });
    return (
        <>
            <div className="aurora-background blurred" />
            <div className={styles.mainContainer}>
                <div className={styles.titleBox}>
                    {/* Mouse Tracker For Desktop */}
                    <div className={styles.tracker + " " + styles.mouse} />
                    {/* Draggable Tracker For Touch Devices  */}
                    <Draggable
                        position={controlledPosition}
                        bounds="parent"
                        onDrag={(e, position) => {
                            const { x, y } = position;
                            setPosition({ x, y });
                        }}
                    >
                        <div
                            className={styles.tracker + " " + styles.tracker2 + " " + styles.touch}
                        />
                    </Draggable>
                    <Draggable position={controlledPosition}>
                        <div className={styles.tracker + " " + styles.touch} />
                    </Draggable>

                    {/* Title Box */}
                    <div className={styles.title}>
                        <span>N. J. A. T. H.</span>
                        <br /> <br />
                        Not Just Another Treasure Hunt
                    </div>

                    <div className={styles.forward}>
                        <a
                            onClick={() => {
                                document.documentElement.classList.add("is-leaving");
                                setTimeout(() => {
                                    document.removeEventListener("mousemove", (e) => {
                                        saveCursorPosition(e.clientX, e.clientY);
                                    });
                                    router.push("/countdown");
                                }, 1100);
                                setTimeout(() => {
                                    document.documentElement.classList.remove("is-leaving");
                                }, 1000);
                            }}
                        >
                            Aparecium
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
