import React, { useEffect, useState } from "react";
import styles from "@/styles/register.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { treasureBox } from "@/assets/TreasureBox";
import axios from "axios"
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [creds, setDetails] = useState({ email: "", fullname: "", password: "", username: "", phone: "" });
    const [isValidSize, setValidity] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter();

    const register = async () => {
        // console.log("OK");
        // if (creds.id.length == 0) setError("Please Enter Your Celesta ID");
        // else if (creds.fullname.length == 0) setError("Please Enter Your Name");
        // else if (creds.phone.length != 10) setError("Please Enter Valid Indian Phone Number");
        // else if (creds.pass.length < 5 || creds.pass.length > 32)
        //     setError("Password must be between 5 and 32 characters");
        // else {
        //     setError(false);
        //     console.log("Okay");
        //     crypto.subtle
        //         .digest("SHA-256", new TextEncoder().encode(creds.pass))
        //         .then((res) => Array.from(new Uint8Array(res)))
        //         .then((res) => {
        //             fetch(`http://localhost:8080/register`, {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json;charset=utf-8",
        //                 },
        //                 body: JSON.stringify({
        //                     ...creds,
        //                     pass: undefined,
        //                     hash: res.map((b) => b.toString(16).padStart(2, "0")).join(""),
        //                 }),
        //             })
        //                 .then((res) => {
        //                     if (res.status == 409) {
        //                         alert("User Already Exists");
        //                         document.getElementById("redir").classList.add(styles.redText);
        //                     }
        //                     console.log(res);
        //                     if (res.status == 200) router.push('/dashboard');
        //                 })
        //                 .catch((error) => alert(error));
        //         });
        // }
        // console.log(error);
        try {
            const response = await axios.post("https://4291-212-8-243-131.ngrok-free.app/api/auth/register", creds)
            if (response.data.success === false)
                toast.error(response.data.message)
            else {
                router.push("/login")
            }

        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        if (window.screen.width < 250 || window.screen.height < 512) setValidity(false);
    }, []);

    return (
        <>
            <ToastContainer autoClose={2000}/>
            <div className={styles.mainContainer}>
                <div
                    className={styles.registerBox}
                    onKeyUp={(event) => {
                        if (event.key == "Enter") register();
                    }}
                >
                    <div className={styles.title}>
                        Register
                    </div>
                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="name"
                            placeholder="Full Name"
                            onChange={(s) => {
                                setDetails({ ...creds, fullname: s.target.value });
                            }}
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
                        />
                    </div>

                    <div className={`${styles.redText} ${error ? "" : styles.invisible}`}>
                        {error ? error : "Noice"}
                    </div>

                    <div>
                        <button onClick={() => register()}
                            className={styles.submit}>Register</button>
                    </div>

                    <Link className={styles.registerRedir} id="redir" href="/login">
                        Already Registered?
                    </Link>

                </div>
                <div className={styles.imageContainer}>
                    <div dangerouslySetInnerHTML={{ __html: treasureBox }}></div>
                </div>
            </div>
        </>
    );
}
