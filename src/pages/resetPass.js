import React, { useState } from "react";
import styles from "@/styles/forgotPass.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function Login() {
    const [details, setDetails] = useState({ password: "", confirmPassword: "" });
    const router = useRouter();
    const { token } = router.query;

    const resetPass = async () => {
        if (!details.password) {
            toast.error("Please enter a new password");
            return;
        }
        if (!details.confirmPassword) {
            toast.error("Please re-enter your password");
            return;
        }
        if (details.confirmPassword !== details.password) {
            toast.error("Passwords donot match");
            return;
        }
        try {
            const response = await axios.post(
                `https://4291-212-8-243-131.ngrok-free.app/api/auth/reset-password/`,
                details.password
            );
            if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.success("Password updated successfully. Login to continue.");
                router.push("/login");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <ToastContainer autoClose={2000} />
            <div className="app-background" />
            <div className={styles.mainContainer}>
                <div
                    className={styles.loginBox}
                    onKeyUp={(event) => {
                        if (event.key == "Enter") resetPass();
                    }}
                >
                    <div className={styles.title}>Reset password</div>

                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="New Password"
                            onChange={(s) => {
                                setDetails({
                                    password: s.target.value,
                                    confirmPassword: details.confirmPassword,
                                });
                            }}
                            required
                        />
                    </div>

                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(s) => {
                                setDetails({
                                    password: details.password,
                                    confirmPassword: s.target.value,
                                });
                            }}
                            required
                        />
                    </div>

                    <div>
                        <button onClick={() => resetPass()} className={styles.submit}>
                            Change password
                        </button>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        alt="Treasure box"
                        src="/assets/treasure_box.svg"
                        width={900.44}
                        height={1000}
                        priority={4}
                    />
                </div>
            </div>
        </>
    );
}
