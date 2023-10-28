"use client"
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Montserrat } from "next/font/google";
import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/navigation";

export default function QuestionList({ question, level }) {
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
    const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false);
    const [unlockLink, setUnlockLink] = useState("");
    const { setUnlockedQuestion } = useAuth();
    const router = useRouter();
    const handleOpenConformationModal = () => {
        setIsUnlockModalOpen(true);
    };

    const handleCloseConformationModal = () => {
        setIsUnlockModalOpen(false);
    };

    const conformationHandler = () => {
        setUnlockedQuestion(true);
        router.push(`${unlockLink}`)
    }

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
                    <>
                        <Link key={index} href={link} style={divStyle}>
                            <div>{icon}</div>
                            <div className="ml-4">
                                {" "}
                                <div style={titleStyle}>
                                    {title}
                                </div>
                            </div>
                            <div className="ml-auto">
                                {" "}
                                {type === 0 && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setUnlockLink(`/question?level=${level}&order=${index + 1}`);
                                            handleOpenConformationModal()
                                        }}
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
                        </Link>
                        <Modal
                            open={isUnlockModalOpen}
                            onClose={handleCloseConformationModal}
                            aria-labelledby="confirm-submission"
                            aria-describedby="are-you-sure"
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    background: "#111A23",
                                    border: "2px solid goldenyellow",
                                    borderRadius: "8px",
                                    p: 4,
                                    width: 350,
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                <h2>Confirm Unlock</h2>
                                <p>Are you sure you want to unlock the question?</p>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleCloseConformationModal}
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            border: "1px solid goldenyellow",
                                            margin: "5px",
                                        }}
                                    >
                                        No
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={conformationHandler}
                                        style={{
                                            backgroundColor: "green",
                                            color: "white",
                                            border: "1px solid goldenyellow",
                                            margin: "5px",
                                        }}
                                    >
                                        Yes
                                    </Button>
                                </div>
                            </Box>
                        </Modal>
                    </>
                );
            })}

            {/* Unlock Confirmation Modal */}
            {
                showUnlockConfirmation && (
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
                )
            }
        </>
    );
}