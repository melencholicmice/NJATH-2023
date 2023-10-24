import React from "react";
import styles from "./level.module.css";

const Level = ({ levelData, onClick }) => {
    const { name, isUnlocked, isCleared, levelNumber } = levelData;

    return (
        <div
            className={`${styles.level} ${isUnlocked ? styles.unlocked : styles.locked}`}
            onClick={onClick}
        >
            <p>Level {levelNumber}</p>
            <span>{name}</span>
            {isCleared ? <span className={styles.completed}>&#10003;</span> : null}
        </div>
    );
};

export default Level;
