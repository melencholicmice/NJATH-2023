import React, { useEffect, useState } from "react";
import styles from "@/styles/register.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios"
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {box} from "../assets/treasure_box.svg"
import Image from "next/image";

export default function Register() {
    const [creds, setDetails] = useState({
        email: "",
        fullname: "",
        password: "",
        username: "",
        phone: "",
    });
    // const [isValidSize, setValidity] = useState(true);
    // const [error, setError] = useState(false);
    const router = useRouter();

    const register = async () => {
        if (creds.email.length == 0) toast.error("Please enter your Email address");
        else if (creds.fullname.length == 0) toast.error("Please enter your Full Name");
        else if (creds.phone.length != 10) toast.error("Please enter a valid Indian Phone Number");
        else if (creds.pass.length < 5 || creds.pass.length > 32)
            toast.error("Password must be between 5 and 32 characters");
        else {
            try {
                const response = await axios.post(
                    "https://4291-212-8-243-131.ngrok-free.app/api/auth/register",
                    creds
                );
                if (response.data.success === false) toast.error(response.data.message);
                else {
                    router.push("/login");
                }
            } catch (error) {
                toast.error("Something went wrong!");
            }
        }
    };

    useEffect(() => {
        if (window.screen.width < 250 || window.screen.height < 512) setValidity(false);
    }, []);

    return (
        <>
            <ToastContainer autoClose={2000} />
            <div className="app-background" />
            <div className={styles.mainContainer}>
                <div
                    className={styles.registerBox}
                    onKeyUp={(event) => {
                        if (event.key == "Enter") register();
                    }}
                >
                    <div className={styles.title}>Register</div>
                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="name"
                            placeholder="Full Name"
                            onChange={(s) => {
                                setDetails({ ...creds, fullname: s.target.value });
                            }}
                            required
                        />
                    </div>
                    <div className={styles.inputDiv}>
                        <input
                            type="email"
                            className={styles.inputField}
                            placeholder="Email"
                            onChange={(s) => {
                                setDetails({ ...creds, email: s.target.value });
                            }}
                            required
                        />
                    </div>
                    <div className={styles.inputDiv}>
                        <input
                            type="text"
                            className={styles.inputField}
                            placeholder="Username"
                            onChange={(s) => {
                                setDetails({ ...creds, username: s.target.value });
                            }}
                            required
                        />
                    </div>
                    <div className={styles.inputDiv}>
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="Create New Password"
                            onChange={(s) => {
                                setDetails({ ...creds, pass: s.target.value });
                            }}
                            required
                        />
                    </div>
                    <div className={styles.inputDiv}>
                        <input
                            type="text"
                            className={styles.inputField}
                            placeholder="Mobile Number"
                            onChange={(s) => {
                                if (
                                    s.target.value.length > 10 ||
                                    s.target.value.match(/[^0-9]/g) != null
                                )
                                    s.target.value = s.target.value.substring(
                                        0,
                                        s.target.value.length - 1
                                    );
                                setDetails({ ...creds, phone: s.target.value });
                            }}
                            required
                        />
                    </div>

                    {/* <div className={`${styles.redText} ${error ? "" : styles.invisible}`}>
                        {error ? error : "Noice"}
                    </div> */}

                    <div>
                        <button onClick={() => register()}
                            className={styles.submit}>Register</button>
                    </div>

                    <div className={styles.already}>
                        Already Registered?
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image src="/assets/treasure_box.svg"
                    width={900.44}
                    height={1000}            
                    ></Image>
                    
                </div>
            </div>
            <div className={styles.bottomchain}>
                    <Image src="/assets/Bottom-chain.svg"
                    width={1300}
                    height={450}            
                    ></Image>
            </div>
        </>
    );
}
