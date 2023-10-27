import React, { useEffect, useState } from 'react'
import styles from "@/styles/question.module.css";
import Image from 'next/image';
import Modal from '@components/Question/Smodal';
import { useRouter } from 'next/router';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import QuestionBox from '@components/QuestionBox/QuestionBox';

function getQueryParameters(url) {
    const queryParameters = new URL(url, `${process.env.NEXT_PUBLIC_FRONTEND_URL}`).searchParams;
    const level = parseInt(queryParameters.get('level'), 10);
    const order = parseInt(queryParameters.get('order'), 10);
    return { level, order };
}

const Question = () => {
    let i = 1, q = 1;
    const router = useRouter();

    const [questionData, setQuestionData] = useState(null);
    const getQuestionData = async (ApiEndpoint, config) => {


        try {
            const response = await fetch(ApiEndpoint, config);
            console.log(response);

            if (response.ok) {
                const data = await response.json();
                setQuestionData(data.data);
                console.log(data.data)
            } else if (response.status === 400) {
                toast.error("Invalid link");
                // router.push('/levels');
            }
            else {
                console.error(`Failed to fetch data. Status: ${response.status}`);
                toast.error("Something Broke! Please Refresh");
            }
        } catch (error) {
            // console.log("error");
            // console.error(error);
            toast.error("Something Broke! Please Refresh");
        }
    };

    useEffect(() => {

        const { level, order } = getQueryParameters(router.asPath);

        if (!level || !order) {
            toast.error("Invalid Link");
            // router.push("/levels");
        }

        const config = {
            credentials: 'include',
        };
        const ApiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/question?level=${Number(level)}&order=${Number(order)}`;
        console.log("entered useEffect");
        if (!questionData) {
            getQuestionData(ApiEndpoint, config);
        }
        console.log(questionData)
    });


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(`enterd jsx`);
    if (questionData)
        console.log(questionData.title);
    return (
        <>
            {

                // questionData ? (
                    <>
                    <p>{questionData}</p>
                        {/* <ToastContainer>
                            <QuestionBox
                                imageUrl={questionData.imageUrl}
                                title={questionData.title}
                                description={questionData.description}
                            />
                        </ToastContainer > */}
                    </>

                // ) : (<div>Loading...</div>)
            }
        </>
    )
};


export default Question