import React, { useEffect, useState } from "react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
    const [creds, setDetails] = useState({ id: "", name: "", pass: "", pass2: "", phone: "" });
    const [isValidSize, setValidity] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter();

    function register() {
        console.log(creds);
        if (creds.id.length == 0) setError("Please Enter Your Celesta ID");
        else if (creds.name.length == 0) setError("Please Enter Your Name");
        else if (creds.phone.length != 10) setError("Please Enter Valid Indian Phone Number");
        else if (creds.pass.length < 5 || creds.pass.length > 32)
            setError("Password must be between 5 and 32 characters");
        else if (creds.pass != creds.pass2) setError("Passwords Don't Match");
        else {
            setError(false);
            console.log("Okay");
            crypto.subtle
                .digest("SHA-256", new TextEncoder().encode(creds.pass))
                .then((res) => Array.from(new Uint8Array(res)))
                .then((res) => {
                    fetch(`http://localhost:8080/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify({
                            ...creds,
                            pass: undefined,
                            pass2: undefined,
                            hash: res.map((b) => b.toString(16).padStart(2, "0")).join(""),
                        }),
                    })
                        .then((res) => {
                            if (res.status == 409) {
                                alert("User Already Exists");
                                document.getElementById("redir").classList.add(styles.redText);
                            }
                            console.log(res);
                            if (res.status == 200) router.push('/dashboard');
                        })
                        .catch((error) => alert(error));
                });
        }
        console.log(error);
    }

    useEffect(() => {
        if (window.screen.width < 250 || window.screen.height < 512) setValidity(false);
    }, []);

    return (
        <>
            <div className="aurora-background blurred" />
            <div className={styles.mainContainer}>
                {!isValidSize ? (
                    <div className={styles.loginBox}>
                        Please use a large enough screen (Minimum: 250px x 512px)
                    </div>
                ) : (
                    <div
                        className={styles.registerBox}
                        onKeyUp={(event) => {
                            if (event.key == "Enter") authenticate();
                        }}
                    >
                        <div className={styles.title}>Register for The Event of Your Life</div>

                        <div className={styles.disclaimer}>
                            Disclaimer: Incorrect details may Disqualify you from the Prize
                        </div>

                        <div className={styles.inputDiv}>
                            Celesta ID
                            <input
                                type="username"
                                onChange={(s) => {
                                    if (s.target.value.match(/[^0-9a-zA-Z]/g) != null)
                                        s.target.value = s.target.value.substring(
                                            0,
                                            s.target.value.length - 1
                                        );
                                    setDetails({ ...creds, id: s.target.value });
                                }}
                            />
                        </div>

                        <div className={styles.inputDiv}>
                            Full Name
                            <input
                                type="name"
                                onChange={(s) => {
                                    setDetails({ ...creds, name: s.target.value });
                                }}
                            />
                        </div>

                        <div className={styles.inputDiv}>
                            Phone Number
                            <input
                                type="text"
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

                        <div className={styles.inputDiv}>
                            Password
                            <input
                                type="password"
                                onChange={(s) => {
                                    if (
                                        s.target.value.match(
                                            /[^0-9a-zA-Z~`!@#$%^&*()_+={}|:;"'<,>.?\[\]\\\/-]/g
                                        ) != null
                                    )
                                        s.target.value = s.target.value.substring(
                                            0,
                                            s.target.value.length - 1
                                        );
                                    if (
                                        s.target.value.length > 0 &&
                                        creds.pass2.length > 0 &&
                                        s.target.value != creds.pass2
                                    )
                                        setError("Passwords Don't Match");
                                    else setError(false);
                                    setDetails({ ...creds, pass: s.target.value });
                                }}
                            />
                        </div>

                        <div className={styles.inputDiv}>
                            Repeat Password
                            <input
                                type="password"
                                onChange={(s) => {
                                    if (
                                        s.target.value.match(
                                            /[^0-9a-zA-Z~`!@#$%^&*()_+={}|:;"'<,>.?\[\]\\\/-]/g
                                        ) != null
                                    )
                                        s.target.value = s.target.value.substring(
                                            0,
                                            s.target.value.length - 1
                                        );
                                    if (
                                        s.target.value.length > 0 &&
                                        creds.pass.length > 0 &&
                                        s.target.value != creds.pass
                                    )
                                        setError("Passwords Don't Match");
                                    else setError(false);
                                    setDetails({ ...creds, pass2: s.target.value });
                                }}
                            />
                        </div>

                        <div className={`${styles.redText} ${error ? "" : styles.invisible}`}>
                            {error ? error : "Noice"}
                        </div>

                        <div className={styles.submit} onClick={() => register()}>
                            Register
                        </div>

                        <Link className={styles.registerRedir} id="redir" href="/login">
                            Already Registered 🥳, Click to Login
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
