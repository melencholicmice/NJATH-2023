import Level from "./level";
import styles from "@styles/levels.module.css";
export default function LeveLAccordians({ levelDetail }) {
    console.log(levelDetail);
    return (
        <div>
            {levelDetail.map((element, index) => (
                <div className={styles.levels} key={index}>
                    <Level unlocked={element} level={index} />
                </div>
            ))}
        </div>
    );
}
