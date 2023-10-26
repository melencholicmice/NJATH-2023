import React , {useState} from 'react'
import styles from "@/styles/question.module.css";
import Image from 'next/image';
// import Modal from "src\components\Question\Smodal.js"
import Modal from '@components/Question/Smodal';
import Nav from "@components/Navbar/nav";
const Question = () => {
    let i = 1, q = 1, score = 40;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
        <Nav className='styles.navText' userStatus={false}></Nav>
        <Modal open={open} handleClose={handleClose}/>
        <div className={styles.mainContainer}>
            <div className={styles.scoreBox}>
                <Image src="/assets/Vector.svg"
                    alt = "vector"
                    width={23}
                    height={25}
                ></Image>
                <div className={styles.qNo}>
                        L0{i} Q0{q}
                    </div>
                <div>
                    Your Score: {score}
                </div>
            </div>
            <div className={styles.questionDiv}>
                <div className={styles.descrpBox}>
                    <p>There was a time when this wouldnt have bothered her. The fact that it did actually bother her bothered her even more. What had changed in her life that such a small thing could annoy her so much for the entire day? She knew it was ridiculous that she even took notice of it, yet she was still obsessing over it as she tried to fall asleep.
                    There was a time when this wouldnt have bothered her. The fact that it did actually bother her bothered her even more. What had changed in her life that such a small thing could annoy her so much for the entire day? She knew it was ridiculous that she even took notice of it, yet she was still obsessing over it as she tried to fall asleep.
                    There was a time when this wouldnt have bothered her. The fact that it did actually bother her bothered her even more. What had changed in her life that such a small thing could annoy her so much for the entire day? She knew it was ridiculous that she even took notice of it, yet she was still obsessing over it as she tried to fall asleep.
                    There was a time when this wouldnt have bothered her. The fact that it did actually bother her bothered her even more. What had changed in her life that such a small thing could annoy her so much for the entire day? She knew it was ridiculous that she even took notice of it, yet she was still obsessing over it as she tried to fall asleep.
                    There was a time when this wouldnt have bothered her. The fact that it did actually bother her bothered her even more. What had changed in her life that such a small thing could annoy her so much for the entire day? She knew it was ridiculous that she even took notice of it, yet she was still obsessing over it as she tried to fall asleep.
                    </p>
                </div>

                    <img className={styles.queimg}
                        src='https://user-images.githubusercontent.com/99478938/277416211-e246b1c6-b5b1-4151-a7f2-ee367a213783.png'>
                    </img>

            </div>
            <div className={styles.ansBox}>
                <input
                    className={styles.ansText}
                    placeholder='Type Your Answer Here'
                    type='text'
                >
                </input>
                <div>
                <button className={styles.hint} onClick={handleOpen}>
                        <div className={styles.CheckContent}>
                            <Image src="/assets/Bulb.svg" alt ="Bulb" width={18} height={18} />
                            <div>Hint</div>
                        </div>
                    </button>
                </div>
                <div>
                    <button className={styles.Check}>
                        <div className={styles.CheckContent}>
                            <Image src="/assets/Check.svg" alt="Tick Mark" width={18} height={18} />
                            <div>Check Answer</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Question