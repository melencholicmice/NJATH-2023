import React, { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import styles from "./level.module.css";
import LockIcon from '@mui/icons-material/Lock';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const Level = ({ unlocked, level }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const router = useRouter();
    const handleAccordionChange = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const customStyles = {
        '--background-color': 'lightgrey',
        '--font-color': 'gold',
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
                    const data = await response.json();
                    setData(data.data);
                }else if(response.status === 401){
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

        if(unlocked === 1){
            fetchData();
        }
    }, []);

    return (
        <ToastContainer>
            <div style={customStyles}>
                hello
                <Accordion disabled={!unlocked} onChange={handleAccordionChange}>
                    <AccordionSummary>
                        {unlocked ? null : <LockIcon />}
                        <Typography style={{ color: 'var(--font-color)' }}>title</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>content</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </ToastContainer>
    );
};

export default Level;
