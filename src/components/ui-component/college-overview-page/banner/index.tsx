'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';

import BannerComponent from './Banner';
import WatchNowDialog from './WatchNowDialog';

import ErrorComponent from 'ui-component/error';
import { IErrorProps } from 'types';

export interface IBannerDataProps {
  name?: string;
  city?: string;
  state?: string;
  logo: string;
  naacGrade?: string;
  type?: string;
  videoId?: string;
}

export interface IBannerProps extends IErrorProps {
  bannerData: IBannerDataProps;
}

const MainBanner: React.FC<IBannerProps> = ({ bannerData, hasError }) => {
  const [open, setOpen] = useState(false);

  //handleOpen for dialog open
  const handleOpen = () => {
    setOpen(true);
  };

  //handleClose for dialog close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box data-test-id="overview-banner">
          <BannerComponent bannerData={bannerData} handleOpenPop={handleOpen} />
          <WatchNowDialog handleClosePop={handleClose} openPop={open} videoId={bannerData.videoId} />
        </Box>
      )}
    </Box>
  );
};

export default MainBanner;
