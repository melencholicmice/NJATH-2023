import * as React from "react";
import { useState } from "react"; // Import useState
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

export default function QuestionList({ question, level }) {
    const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false);

    // Add state to track the selected question for unlocking
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

    // Function to handle opening the confirmation modal
    const handleUnlockConfirmation = (index) => {
        setSelectedQuestionIndex(index); // Track the selected question
        setShowUnlockConfirmation(true); // Open the modal
    };

    // Function to handle closing the confirmation modal
    const handleCloseUnlockConfirmation = () => {
        setShowUnlockConfirmation(false); // Close the modal
    };

    // Function to unlock the selected question (You can implement your logic here)
    const handleUnlockQuestion = () => {
        // Perform unlock logic here (e.g., deduct points)
        // Once the unlock logic is done, you can close the modal
        setShowUnlockConfirmation(false);
    };

    return (
        <>
            {question.map(({ type, title }, index) => {
                let borderColor, icon, titleColor;

                if (type === 0) {
                    borderColor = "#FFFFFF99";
                    icon = (
                        <Image
                            src="/assets/Locked-Dimmed.svg"
                            alt="Check Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "#FFFFFF99";
                } else if (type === 1 || type === 2) {
                    borderColor = "#FDCC06";

                    icon = (
                        <Image
                            src="/assets/Property 1=Unlocked Icon.svg"
                            alt="Hint Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "white";
                } else {
                    borderColor = "#FDCC0699";
                    icon = (
                        <Image
                            src="/assets/Property 1=SolvedGOld.svg"
                            alt="Lock Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "white";
                }

                const link = type === 0 ? "" : `/question?level=${level}&order=${index + 1}`;
                const divStyle = {
                    display: "flex",
                    alignItems: "center", // Align items vertically in the center
                    padding: "8px",
                    margin: "30px",
                    border: `2px solid ${borderColor}`,
                    borderRadius: "8px",
                };

                const titleStyle = {
                    fontSize: "0.85em",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    letterSpacing: "1px",
                    color: `${titleColor}`,
                };

                return (
                    <div key={index} style={divStyle}>
                        <div>{icon}</div>
                        <div className="ml-4">
                            {" "}
                            <Link href={link} style={titleStyle}>
                                {title}
                            </Link>
                        </div>
                        <div className="ml-auto">
                            {" "}
                            {type === 0 && (
                                <Button
                                    variant="outlined"
                                    onClick={() => handleUnlockConfirmation(index)}
                                    style={{
                                        opacity: 0.8,
                                        color: "#FDCC06",
                                        fontWeight: "bold",
                                        backgroundColor: "#1D2D3E",
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    Unlock
                                </Button>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Unlock Confirmation Modal */}
            {showUnlockConfirmation && (
                <div>
                    <div>Are you sure you want to unlock this question?</div>
                    <Button
                        variant="outlined"
                        onClick={handleUnlockQuestion}
                        style={{
                            opacity: 0.8,
                            color: "#FDCC06",
                            fontWeight: "bold",
                            backgroundColor: "#1D2D3E",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleCloseUnlockConfirmation}
                        style={{
                            opacity: 0.8,
                            color: "#FDCC06",
                            fontWeight: "bold",
                            backgroundColor: "#1D2D3E",
                            fontFamily: "Montserrat",
                        }}
                    >
                        No
                    </Button>
                </div>
            )}
        </>
    );
}
