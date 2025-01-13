/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import infoStyles from '../../compareInfoStyles.module.css';
import { CompareInfoConstant } from '../../constants';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IFundsProps {
  sponsoredResearch: number;
  consultancyProject: number;
}

export interface IFundsDataProps extends IErrorProps {
  funds: IFundsProps[];
}

const Funds: FC<IFundsDataProps> = ({ funds, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [fundsState, setFundsState] = useState<IFundsProps[]>([...funds]);
  useEffect(() => {
    if (isMdDown) {
      setFundsState([...funds.slice(0, 2)]);
    } else setFundsState([...funds]);
  }, [isMdDown, funds]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        fundsState.length > 0 && (
          <Box className={infoStyles.clgInfoCard}>
            <Box className={infoStyles.CompareInfoHead}>
              <Typography variant="h3">{CompareInfoConstant.FUNDS}</Typography>
            </Box>
            <Box className={infoStyles.InfoCard}>
              <Box className={infoStyles.cardRow}>
                {fundsState.map((fundsInfo, index) => {
                  return (
                    <Box className={infoStyles.cardColumn} key={index}>
                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {fundsInfo.sponsoredResearch || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.SPONSORED_RESEARCH}
                        </Typography>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {fundsInfo.consultancyProject || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.CONSULTANCY_PROJECT}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default Funds;
