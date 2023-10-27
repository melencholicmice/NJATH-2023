import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

export default function QuestionList({ question, level }) {
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
        </>
    );
}
