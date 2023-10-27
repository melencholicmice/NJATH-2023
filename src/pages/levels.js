"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loading from '@/components/Loading/Loading';
import LeveLAccordians from '@components/Level/LevelAccordian';
import styles from "@styles/levels.module.css"

const Levels = () => {
    const [data, setData] = useState(null);
    const router = useRouter();
    const participantDataApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/`;

    useEffect(() => {
        const fetchData = async () => {
            const axiosConfig = {
                withCredentials: true,
            };

            try {
                await new Promise(resolve => setTimeout(resolve, 3000));
                const response = await axios.get(participantDataApi, axiosConfig);
                console.log(response);
                if (response.status === 200) {
                    setData(response.data.data);
                } else if (response.status === 400 || response.status === 401) {
                    toast.error("Please Log in First");
                    router.push("/login");
                } else {
                    toast.error("Something Broke! Please refresh");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            toast.error("Please Log in First");
                            router.push('/login');
                        } else {
                            toast.error("Something Broke! Please refresh");
                        }
                    }
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <ToastContainer autoClose={2000} />
            {/* <Navbar /> */}
            <div className="app-background" />
                <div>
                    {data ? (
                        <>
                            <div>{data.email}</div>
                            <div>{data.points}</div>
                            <div>{data.isBanned}</div>
                            <div>{data.remainingLoan}</div>
                            <div>{data.levelDetail}</div>
                            <div>{data.username}</div>
                            <LeveLAccordians levelDetail={data.levelDetail}/>
                        </>
                    ) : (
                        <Loading/>
                    )}
            </div>
        </div>
    );
};

export default Levels;
