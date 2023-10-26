import React, { useEffect, useState } from "react";
import styles from "@/styles/register.module.css";
import { useRouter } from "next/router";
import axios from "axios"
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import Nav from "@componenets/Navbar/nav";

export default function Register() {
    const [details, setDetails] = useState({
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
        if (details.email.length == 0) toast.error("Please enter your Email address");
        else if (details.fullname.length == 0) toast.error("Please enter your Full Name");
        else if (details.phone.length != 10)
            toast.error("Please enter a valid Indian Phone Number");
        else if (details.pass.length < 5 || details.pass.length > 32)
            toast.error("Password must be between 5 and 32 characters");
        else {
            try {
                const response = await axios.post(
                    "https://4291-212-8-243-131.ngrok-free.app/api/auth/register",
                    details
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
        <Nav className='styles.navText' userStatus={false}></Nav>
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
                                setDetails({ ...details, fullname: s.target.value });
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
                                setDetails({ ...details, email: s.target.value });
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
                                setDetails({ ...details, username: s.target.value });
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
                                setDetails({ ...details, pass: s.target.value });
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
                                setDetails({ ...details, phone: s.target.value });
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
