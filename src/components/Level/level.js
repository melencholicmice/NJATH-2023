import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import QuestionList from '@components/QuestionList/QuestionList';
import Loading from '@components/Loading/Loading';

const Level = ({ unlocked, level }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const router = useRouter();
    const handleAccordionChange = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const customStyles = {
        '--background-color': '#111A23',
        '--font-color': 'gold',
        '--disabled-opacity': unlocked ? 1 : 0.5, // Adjust the opacity as needed
    };

    const [data, setData] = useState(null);
    const levelDetailApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/get-level-details?level=${level + 1}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(levelDetailApi, { credentials: 'include' });
                const data = await response.json();
                console.log(data);
                if (response.status === 200) {
                    setData(data.data);
                } else if (response.status === 401) {
                    // router.push("/login");
                    console.log(response.data);
                }
                else {
                    console.error(`Failed to fetch data. Status: ${response.status}`);
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (unlocked === 1 && isAccordionOpen) {
            fetchData();
        }
    }, [isAccordionOpen]);

    return (
        <div style={customStyles} >
            <Accordion disabled={!unlocked} onChange={handleAccordionChange} sx={{ backgroundColor: "#111A24" }}>
                <AccordionSummary className="p-4 border-b border-gray-300 dark:border-gray-700">
                    {unlocked ? null : <LockIcon />}
                    <Typography style={{ color: 'var(--font-color)' }}> Level {level + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    {data ? (
                        <QuestionList  question={data.question} />
                    ) : (
                        <Loading />
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Level;
