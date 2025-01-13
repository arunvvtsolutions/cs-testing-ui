import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Image from 'next/image';

import styles from './styles.module.css';
interface IRankCostantDataProps {
  TITLE: string;
  SUB_TEXT: string;
  FOOT_CONTENT: string;
  BASED_ON: string;
}

interface IRankScoreDataProps {
  rankScore: number | string;
  estimatedRank: number | string;
  percentileScore: number | string;
}
interface IRankScore {
  constantData: IRankCostantDataProps;
  RankScoreData: IRankScoreDataProps;
  openPopup: boolean;
  handleClose?: () => void;
}

const RankScorePopup: React.FC<IRankScore> = ({ constantData, RankScoreData, openPopup, handleClose }) => {
  // call popup function from parent
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPopup}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={openPopup} timeout={300}>
          <Box className={styles.popup_content}>
            <Box className={styles.popup_contentWarp}>
              <IconButton className={styles.popup_close} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Image
                className={`${styles.greeting_image} ${styles.fadeanimation}`}
                src="/assets/images/greeting.webp"
                layout="fill"
                alt="greeting"
              />
              <Typography className={styles.popup_title} variant="h3">
                {constantData.TITLE}
              </Typography>

              <Box className={styles.score_bord}>{RankScoreData.rankScore}</Box>
              <Typography variant="body1" className={styles.subText}>
                {constantData.SUB_TEXT}
              </Typography>

              <Box className={styles.score_bordFooter}>
                {constantData.FOOT_CONTENT} <span>{RankScoreData.estimatedRank}</span>, {constantData.BASED_ON}{' '}
                <span> {RankScoreData.percentileScore}</span>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default RankScorePopup;
