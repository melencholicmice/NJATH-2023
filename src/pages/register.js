import React, { useEffect, useState } from "react";
import styles from "@/styles/register.module.css";
import stylesLogin from "@/styles/login.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Nav from "@components/Navbar/nav";
import Link from "next/link";
export default function Register() {
    const [details, setDetails] = useState({
        email: "",
        fullname: "",
        password: "",
        username: "",
        phone: "",
    });
    const router = useRouter();

    const register = async () => {
        if (details.email.length == 0) toast.error("Please enter your Email address");
        else if (details.fullname.length == 0) toast.error("Please enter your Full Name");
        else if (details.phone.length != 10)
            toast.error("Please enter a valid Indian Phone Number");
        else if (details.password.length < 5 || details.password.length > 32)
            toast.error("Password must be between 5 and 32 characters");
        else {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/auth/register-participant",
                    details
                );
                if (response.data.success === false) toast.error(response.data.message);
                else {
                    router.push("/login");
                }
            } catch (error) {
                console.log(details);
                toast.error("Something went wrong!");
            }
        }
    };

    useEffect(() => {
        if (window.screen.width < 250 || window.screen.height < 512) setValidity(false);
    }, []);

    return (
        <div className="font-montserrat">
            <Nav className="styles.navText" userStatus={false}></Nav>
            <ToastContainer autoClose={2000} />
            <Image src="/assets/treasure_box.svg" className={styles.treasurebox}
                    width={1300}
                    height={700}
                    ></Image>
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
                            className="form_input"
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
                            className="form_input"
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
                            className="form_input"
                            placeholder="Create Username"
                            onChange={(s) => {
                                setDetails({ ...details, username: s.target.value });
                            }}
                            required
                        />
                    </div>
                    <div className={styles.inputDiv}>
                        <input
                            type="password"
                            className="form_input"
                            placeholder="Create New Password"
                            onChange={(s) => {
                                setDetails({ ...details, password: s.target.value });
                            }}
                            required
                        />
                    </div>
                    <div className={styles.inputDiv}>
                        <input
                            type="text"
                            className="form_input"
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
                        <button onClick={() => register()}
                            className={styles.submit}>Register</button>
                    <div className={styles.already}>
                        Already Registered?
                    </div>
                        <Link className={styles.login} href="/login">
                            Login Here
                        </Link>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        alt=""
                        src="/assets/treasure_box.svg"
                        width={1300}
                        height={700}
                        priority={4}
                    ></Image>
                </div>
            </div>
        </div>
    );
}
