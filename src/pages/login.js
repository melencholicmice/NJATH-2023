import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { treasureBox } from "@/assets/TreasureBox";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [creds, setDetails] = useState({ email: "", password: "" });
    const router = useRouter();

    const authenticate = async () => {
        if (!creds.email || !creds.password) {
            toast.error("Please fill in both email and password fields");
            return;
        }
        try {
            const response = await axios.post(
                `https://4291-212-8-243-131.ngrok-free.app/api/auth/login`,
                creds
            );
            console.log(response);
            if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.success("Login Successful!");
                router.push("/dashboard");
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
                        if (event.key == "Enter") authenticate();
                    }}
                >
                    <div className={styles.title}>Login</div>

                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="email"
                            placeholder="Email"
                            onChange={(s) => {
                                setDetails({ email: s.target.value, password: creds.password });
                            }}
                            required
                        />
                    </div>

                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Password"
                            onChange={(s) => {
                                setDetails({ email: creds.email, password: s.target.value });
                            }}
                            required
                        />
                    </div>

                    <div className={styles.forgotPassword}>
                        <Link className="forgot-password-link" href="/forgotPass">
                            Forgot Password?
                        </Link>
                    </div>

                    <div>
                        <button onClick={() => authenticate()} className={styles.submit}>
                            Login
                        </button>
                    </div>
                    <div className={styles.registerRedir}>
                        <span>
                            Not registered Yet?
                            <br />
                        </span>
                        <Link
                            href="/register"
                            style={{ textDecoration: "underline", color: "yellow" }}
                        >
                            Register Now!
                        </Link>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <div dangerouslySetInnerHTML={{ __html: treasureBox }}></div>
                </div>
            </div>
        </>
    );
}
