import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Nav from "./nav";

export default function Login() {
    const [creds, setDetails] = useState({ id: "", pass: "" });
    const router = useRouter();

    function authenticate() {
        crypto.subtle
            .digest("SHA-256", new TextEncoder().encode(creds.pass))
            .then((res) => Array.from(new Uint8Array(res)))
            .then((res) => {
                fetch(`http://localhost:8080/auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        ...creds,
                        pass: undefined,
                        hash: res.map((b) => b.toString(16).padStart(2, "0")).join(""),
                    }),
                })
                    .then((res) => {
                        if (res.status == 401) alert("Incorrect ID or Password");
                        console.log(res);
                        if (res.status == 200) router.push('/dashboard');
                    })
                    .catch((error) => alert(error));
            });
    }

    return (
        <>
            <Nav className='styles.navText'></Nav>
            <div className="aurora-background blurred" />
            <div className={styles.mainContainer}>
                <div
                    className={styles.loginBox}
                    onKeyUp={(event) => {
                        if (event.key == "Enter") authenticate();
                    }}
                >
                    <div className={styles.title}>Log into N.J.A.T.H.</div>

                    <div className={styles.inputDiv}>
                        Celesta ID
                        <input
                            type="username"
                            onChange={(s) => {
                                setDetails({ id: s.target.value, pass: creds.pass });
                            }}
                        />
                    </div>

                    <div className={styles.inputDiv}>
                        Password
                        <input
                            type="password"
                            onChange={(s) => {
                                setDetails({ id: creds.id, pass: s.target.value });
                            }}
                        />
                    </div>

                    <div className={styles.submit} onClick={() => authenticate()}>
                        Login
                    </div>

                    <Link className={styles.registerRedir} href="/register">
                        <span>Not Registered 😱</span>, Click to Register
                    </Link>
                </div>
            </div>
        </>
    );
}
