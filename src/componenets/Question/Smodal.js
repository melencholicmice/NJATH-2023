import React from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '@/styles/question.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
const SModal = ({open,handleClose}) => {
  return (
    <div style={{color:'white'}}>
    <Modal open={open}
      onClose={handleClose}>
        <Box className={styles.modal}>
          <Typography  fontWeight="700" fontSize="25px" color="white">
            Hint
          </Typography>
          <Typography marginTop={5} color='white'> 
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
    </Modal>
    </div>
  )
}

export default SModal