import React from 'react'
import styles from "@/styles/question.module.css";
import Image from 'next/image';
const question = () => {
    let i = 1, q = 1, score = 40;
    return (
        <div className={styles.mainContainer}>
            <div className={styles.scoreBox}>
                <Image src="/assets/Vector.svg"
                    width={23}
                    height={25}
                ></Image>
                <div>
                    Your Score: {score}
                </div>
            </div>
            <div className={styles.questionDiv}>
                <div className={styles.descrpBox}>
                    <div className={styles.qNo}>
                        L0{i} Q0{q}
                    </div>
                    <p>brufhbuiidfbfh</p>
                    <p>brufhbuiidfbfh</p>
                    <p>brufhbuiidfbfh</p>
                    <p>brufhbuiidfbfh</p>
                    <p>brufhbuiidfbfh</p>
                </div>
                <div className={styles.questionImage}>
                    <img className={styles.queimg}
                        src='https://user-images.githubusercontent.com/99478938/277416211-e246b1c6-b5b1-4151-a7f2-ee367a213783.png'>

                    </img>
                </div>
            </div>
            <div className={styles.ansBox}>
                <input
                    className={styles.ansText}
                    placeholder='Type Your Answer Here'
                    type='text'
                >
                </input>
                <div>
                <button className={styles.hint}>
                        <div className={styles.CheckContent}>
                            <Image src="/assets/Bulb.svg" width={18} height={18} />
                            <div>Hint</div>
                        </div>
                    </button>
                </div>
                <div>
                    <button className={styles.Check}>
                        <div className={styles.CheckContent}>
                            <Image src="/assets/Check.svg" width={18} height={18} />
                            <div>Check Answer</div>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default question