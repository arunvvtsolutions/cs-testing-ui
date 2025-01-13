import { Box } from '@mui/material';
import React from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import styles from './Banner.module.css';

// import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface IBannerProps {
  openPop: boolean;
  handleClosePop: () => void;
  videoId?: string;
}

const WatchNowDialog: React.FC<IBannerProps> = ({ handleClosePop, openPop, videoId }) => {
  return (
    <Modal
      open={openPop}
      onClose={handleClosePop}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: '2000' }}
    >
      <Box className={styles.popUpContent}>
        <Box style={{ position: 'relative' }}>
          <CloseIcon onClick={handleClosePop} color="primary" className={styles.closBtnPOP} />
          <Box className={styles.iframeWrap} style={{ width: '100%', maxWidth: '100%' }}>
            <LiteYouTubeEmbed
              data-you-play=".button-play"
              aspectHeight={9}
              aspectWidth={16}
              id={videoId || ''}
              title={'YouTube Video Player' || ''}
              muted
            ></LiteYouTubeEmbed>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default WatchNowDialog;
