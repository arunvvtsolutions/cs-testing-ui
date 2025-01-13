/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoStyles from '../../compareInfoStyles.module.css';
import { CompareInfoConstant } from '../../constants';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
export interface IAprovedIntakeProps {
  ug4Years?: number;
  ug5Years?: number;
  pg2Years?: number;
  pg3Years?: number;
}

export interface IIntakeDataProps extends IErrorProps {
  approvedIntake: IAprovedIntakeProps[];
}
const ApprovedIntake: FC<IIntakeDataProps> = ({ approvedIntake, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [approvedIntakeState, setapprovedIntakeStateData] = useState<
    IAprovedIntakeProps[]
  >([...approvedIntake]);
  useEffect(() => {
    if (isMdDown) {
      setapprovedIntakeStateData([...approvedIntake.slice(0, 2)]);
    } else {
      setapprovedIntakeStateData([...approvedIntake]);
    }
  }, [isMdDown, approvedIntake]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        approvedIntakeState.length > 0 && (
          <Box className={infoStyles.clgInfoCard}>
            <Box className={infoStyles.CompareInfoHead}>
              <Typography variant="h3">
                {CompareInfoConstant.SANCTIONED_INTAKE}
              </Typography>
            </Box>
            <Box className={infoStyles.InfoCard}>
              <Box className={infoStyles.cardRow}>
                {approvedIntakeState.map((intakeInfo, index) => {
                  return (
                    <Box className={infoStyles.cardColumn} key={index}>
                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {intakeInfo.pg2Years || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.PG_2YRS}
                        </Typography>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {intakeInfo.pg3Years || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.PG_3YRS}
                        </Typography>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {intakeInfo.ug4Years || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.PG_4YRS}
                        </Typography>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {intakeInfo.ug5Years || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.PG_5YRS}
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

export default ApprovedIntake;
