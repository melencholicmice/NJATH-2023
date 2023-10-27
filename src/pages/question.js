import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import QuestionBox from "@components/QuestionBox/QuestionBox";

function getQueryParameters(url) {
    const queryParameters = new URL(url, `${process.env.NEXT_PUBLIC_FRONTEND_URL}`).searchParams;
    const level = parseInt(queryParameters.get("level"), 10);
    const order = parseInt(queryParameters.get("order"), 10);
    return { level, order };
}

const Question = () => {
    const router = useRouter();

    const [questionData, setQuestionData] = useState(null);

    const getQuestionData = async (ApiEndpoint, config) => {
        try {
            const response = await fetch(ApiEndpoint, config);

            if (response.ok) {
                const data = await response.json();
                setQuestionData(data.data);
            } else if (response.status === 400) {
                toast.error("This Question is locked");
                router.push("/levels")
            } else {
                console.error(`Failed to fetch data. Status: ${response.status}`);
                router.push("/levels")
            }
        } catch (error) {
            toast.error("Something Broke! Please Refresh");
        }
    };

    const getData = async () => {
        const { level, order } = getQueryParameters(router.asPath);

        if (!level || !order) {
            toast.error("Invalid Link");
        }

        const config = {
            credentials: "include",
        };
        const ApiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/question?level=${Number(level)}&order=${Number(order)}`;

        await getQuestionData(ApiEndpoint, config);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getData();
            console.log(res);
        };

        fetchData();
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ToastContainer autoClose={2000} />
            {questionData !== null ? (
                <QuestionBox
                    imageUrl={questionData.imageUrl}
                    title={questionData.title}
                    description={questionData.description}
                    level={questionData.level}
                    order={questionData.order}
                />
            ) : (<div> Loading ...</div>)
            }
        </>
    );
};

export default Question;
