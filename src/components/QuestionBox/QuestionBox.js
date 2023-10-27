import styles from "@/styles/question.module.css";
import Image from "next/image";

function QuestionBox(props) {
    console.log(props);
    // console.log(imageUrl);
    // console.log(title);
    // console.log(description);
    return (
        <>
            {/* <Modal open={open} handleClose={handleClose} /> */}
            <div className={styles.mainContainer}>
                <div className={styles.scoreBox}>
                    <Image alt="" src="/assets/Vector.svg" width={23} height={25}></Image>
                    <div className={styles.qNo}>{title}</div>
                </div>
                <div className={styles.questionDiv}>
                    <div className={styles.descrpBox}>
                        <p>{description} nivlhnrgknerng nergnkbhetoin</p>
                    </div>

                    {questionData.imageUrl ? (
                        <img alt="Question" className={styles.queimg} src={imageUrl}></img>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={styles.ansBox}>
                    <input
                        className={styles.ansText}
                        placeholder="Type Your Answer Here"
                        type="text"
                    ></input>
                    <div>
                        <button className={styles.hint} onClick={handleOpen}>
                            <div className={styles.CheckContent}>
                                <Image alt="Hint" src="/assets/Bulb.svg" width={18} height={18} />
                                <div>Hint</div>
                            </div>
                        </button>
                    </div>
                    <div>
                        <button className={styles.Check}>
                            <div className={styles.CheckContent}>
                                <Image
                                    alt="Check Answer"
                                    src="/assets/Check.svg"
                                    width={18}
                                    height={18}
                                />
                                <div>Check Answer</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default QuestionBox;
