import React, { useState } from "react";
import styles from "@/styles/forgotPass.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [details, setDetails] = useState({ email: "", phone: "" });
    const router = useRouter();

    const changePass = async () => {
        if (!details.email) {
            toast.error("Please enter your email address");
            return;
        }
        if (details.phone.length() != 10) {
            toast.error("Please enter a valid phone number");
            return;
        }
        try {
            const response = await axios.post(
                `https://4291-212-8-243-131.ngrok-free.app/api/auth/forget-password`,
                details
            );
            if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.info(response.data.message);
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
                        if (event.key == "Enter") changePass();
                    }}
                >
                    <div className={styles.title}>Enter your details</div>

                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="email"
                            placeholder="Email"
                            onChange={(s) => {
                                setDetails({ email: s.target.value, phone: details.phone });
                            }}
                            required
                        />
                    </div>

                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="phone"
                            placeholder="Mobile Number"
                            onChange={(s) => {
                                setDetails({ email: details.email, phone: s.target.value });
                            }}
                            required
                        />
                    </div>

                    <div>
                        <button onClick={() => changePass()} className={styles.submit}>
                            Proceed -&gt;
                        </button>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image src="/assets/treasure_box.svg" width={900.44} height={1000}></Image>
                </div>
            </div>
        </>
    );
}
