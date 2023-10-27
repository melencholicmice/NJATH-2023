import styles from "@/styles/question.module.css";
import Image from "next/image";
import CheckAnswer from "./CheckAnswer";

function QuestionBox({ imageUrl, title, description, order, level }) {
    // console.log(props);
    console.log(imageUrl);
    console.log(title);
    console.log(description);
    return (
        <>
            {/* <Modal open={open} handleClose={handleClose} /> */}
            <div className={styles.mainContainer}>
                <div className={styles.scoreBox}>
                    <Image src="/assets/Vector.svg"
                        width={23}
                        height={25}
                    ></Image>
                    <div className={styles.qNo}>
                        L{level} Q{order} :- {title}
                    </div>

                </div>
                <div className={styles.questionDiv}>
                    <div className={styles.descrpBox}>
                        <p>{description}</p>
                    </div>

                    {
                        imageUrl ? (<img className={styles.queimg}
                            src={imageUrl}>
                        </img>) : (<></>)
                    }


                </div>
                <CheckAnswer
                    level={level}
                    order={order}
                />
            </div>
        </>
    );
}
export default QuestionBox;
