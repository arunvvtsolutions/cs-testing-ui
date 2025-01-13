import React from 'react';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import parser from 'html-react-parser';

import styles from './CampusOverview.module.css';
import { CampusSubTitles } from './constant';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

// Define an interface for campus data
interface ICampusData {
  shortName?: string;
  area?: string;
  library?: string;
  hostels?: number;
  sportsGround?: number;
  totalStudent?: string;
  description: string;
}

export interface ICampusProps extends IErrorProps {
  campusData: ICampusData[];
}

const CampusOverview: React.FC<ICampusProps> = ({ campusData, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        campusData &&
        campusData.length > 0 && (
          <Box className="emptyCard" data-test-id="amenities-campus-overview">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {campusData[0]?.shortName} {CampusSubTitles.CAMPUS_OVERVIEW}
              </Typography>
            </Box>
            <MainCard>
              <Box className={styles.campusMainCard}>
                <Box className={styles.campusSection}>
                  <Box className={styles.campusBox}>
                    <Typography className={styles.campusValue}>
                      {campusData[0]?.area !== '' ? campusData[0]?.area : '-'}
                    </Typography>
                    <Typography className={styles.campusText}>{CampusSubTitles.AREA}</Typography>
                  </Box>

                  <Box className={styles.campusBox}>
                    <Typography className={styles.campusValue}>
                      {campusData[0]?.hostels !== 0 ? campusData[0]?.hostels : '-'}
                    </Typography>
                    <Typography className={styles.campusText}>{CampusSubTitles.HOSTELS}</Typography>
                  </Box>

                  <Box className={styles.campusBox}>
                    <Typography className={styles.campusValue}>
                      {campusData[0]?.library !== '' ? campusData[0]?.library : '-'}
                    </Typography>
                    <Typography className={styles.campusText}>{CampusSubTitles.LIBRARY}</Typography>
                  </Box>

                  <Box className={styles.campusBox}>
                    <Typography className={styles.campusValue}>
                      {campusData[0]?.sportsGround !== 0 ? campusData[0]?.sportsGround : '-'}
                    </Typography>
                    <Typography className={styles.campusText}>{CampusSubTitles.SPORTS_GROUND}</Typography>
                  </Box>

                  <Box className={styles.campusBox}>
                    <Typography className={styles.campusValue}>
                      {campusData[0]?.totalStudent !== '' ? campusData[0]?.totalStudent : '-'}
                    </Typography>
                    <Typography className={styles.campusText}>{CampusSubTitles.TOTAL_STUDENT}</Typography>
                  </Box>
                </Box>
                {!isMdDown && <Divider />}
                {campusData[0]?.description && (
                  <Box className={styles.campusDescription}>
                    <Box>
                      <Typography className="custompara">{parser(campusData[0]?.description)}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </MainCard>
          </Box>
        )
      )}
    </>
  );
};

export default CampusOverview;
