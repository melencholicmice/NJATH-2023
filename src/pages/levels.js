import React, { useState, useEffect } from "react";
import { Navbar, Question, Level } from "@/componenets";
import styles from "../styles/levels.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const levelsData = [
    { name: "Level 1", isUnlocked: true, isCleared: true, levelNumber: 1 },
    { name: "Level 2", isUnlocked: false, isCleared: false, levelNumber: 2 },
    { name: "Level 3", isUnlocked: false, isCleared: false, levelNumber: 3 },
    { name: "Level 4", isUnlocked: false, isCleared: false, levelNumber: 4 },
    { name: "Level 5", isUnlocked: false, isCleared: false, levelNumber: 5 },
    { name: "Level 6", isUnlocked: false, isCleared: false, levelNumber: 6 },
];

const questionsData = [
    { name: "Question One", isUnlocked: true, isCleared: false, questionNumber: 1 },
    { name: "Question Two", isUnlocked: true, isCleared: false, questionNumber: 2 },
    { name: "Question Three", isUnlocked: false, isCleared: false, questionNumber: 3 },
    { name: "Question Four", isUnlocked: false, isCleared: false, questionNumber: 4 },
    { name: "Question Five", isUnlocked: false, isCleared: false, questionNumber: 5 },
    { name: "Question Six", isUnlocked: false, isCleared: false, questionNumber: 6 },
];

const Index = () => {
    const [levelsCleared, setLevelsCleared] = useState(0);
    const [isBanned, setIsBanned] = useState(false);
    const [remainingLoan, setRemainingLoan] = useState(2);
    const [points, setPoints] = useState(0);
    const [filteredLevelsData, setFilteredLevelsData] = useState([]);
    const [questionStatus, setQuestionStatus] = useState({});

    const getParticipantData = async () => {
        try {
            const response = await axios.get("https://your-api-host/api/participant/");
            if (response.data.success === false) toast.error(response.data.message);
            else {
                setLevelsCleared(response.data.clearedLevels);
                setIsBanned(response.data.isBanned);
                setRemainingLoan(response.data.remainingLoan);
                setPoints(response.data.points);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const unlockQuestions = (levelNumber) => {
        // try{
        //     const response=axios.get(`{{host}}/api/participant/get-level-details?level${levelNumber}`)
        //     if(response.data.success===false){
        //         toast.error(response.data.message)
        //     }
        //     else{
                
        //     }

        // }
        // const response = {
        //     success: true,
        //     data: {
        //         correctAnswers: [2],
        //         totalQuestions: 8,
        //         hintTaken: [],
        //         openedQuestions: [2],
        //     },
        // };

        // setQuestionStatus({ ...quetisonStatus, [levelNumber]: response.data });
    };

    useEffect(() => {
        getParticipantData();
    }, []);

    useEffect(() => {
        const updatedLevelsData = levelsData.map((level, index) => ({
            ...level,
            isCleared: index < levelsCleared,
            isUnlocked: index <= levelsCleared,
        }));
        setFilteredLevelsData(updatedLevelsData);
    }, [levelsCleared]);

    return (
        <div>
            <Navbar />
            <ToastContainer autoClose={2000} />
            <div className="app-background" />
            <div className={styles.mainContainer}>
                <p>
                    Your score: <span>{points}</span>
                </p>
                <div className={styles.levelsContainer}>
                    {filteredLevelsData.map((level, index) => (
                        <Level
                            key={index}
                            levelData={level}
                        />
                    ))}
                </div>
                <div className={styles.questionsContainer}>
                    {questionsData.map((question, index) => (
                        <Question
                            key={index}
                            questionData={question}
                            status={questionStatus[question.questionNumber]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;
