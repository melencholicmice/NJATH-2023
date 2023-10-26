"use client"
import React, { useState, useEffect } from "react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Nav from "../componenets/Navbar/nav";

export default function Login() {
    const [details, setDetails] = useState({ email: "", password: "" });
    const router = useRouter();

    useEffect(()=>{
        getLogin(router);
    },[]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!details.email || !details.password) {
            toast.error("Please fill in both email and password fields");
            return;
        }

        const config = {
            withCredentials: true,
        };

        try {
            const response = await axios.post(
                loginApiUrl,
                details,
                config
            );

            const cookies = response.headers['set-cookie'];
            if(response.status === 400){
                toast.error("Login Failed! wrong credentials")
            }
            else if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.success("Login Successful!");
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("Login Failed! please enter correct password and email");
        }
    };

    return (
        <>
            <Nav className='styles.navText' userStatus={false}></Nav>
            <ToastContainer autoClose={2000} />
            <div className="app-background" />
            <div className={styles.mainContainer}>
                <form
                    className={styles.loginBox}
                    onSubmit={submitHandler}
                >
                    <div className={styles.title}>Login</div>

                    <div className={styles.inputDiv}>
                        <input
                            className={styles.inputField}
                            type="email"
                            placeholder="Email"
                            onChange={(s) => {
                                setDetails({ email: s.target.value, password: details.password });
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
                                setDetails({ email: details.email, password: s.target.value });
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
                        <button
                            type="submit"
                            className={styles.submit}
                        >
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
                </form>
                <div className={styles.imageContainer}>
                    <Image
                        src="/assets/treasure_box.svg"
                        width={900.44}
                        height={1000}
                        alt="Tresure image"
                    ></Image>
                </div>
            </div>
        </>
    );
}

