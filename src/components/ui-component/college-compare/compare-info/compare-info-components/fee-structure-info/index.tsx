/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CompareInfoConstant } from '../../constants';

import infoStyles from '../../compareInfoStyles.module.css';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IFeeStructure {
  overallFees: number;
}

export interface IFeeDataStructure extends IErrorProps {
  feeStructure: IFeeStructure[];
}
const FeeStructure: FC<IFeeDataStructure> = ({ feeStructure, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [feeStructureState, setfeeStructure] = useState<IFeeStructure[]>([
    ...feeStructure,
  ]);
  useEffect(() => {
    if (isMdDown) {
      setfeeStructure([...feeStructure.slice(0, 2)]);
    } else setfeeStructure([...feeStructure]);
  }, [isMdDown, feeStructure]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        feeStructureState.length > 0 && (
          <Box className={infoStyles.clgInfoCard}>
            <Box className={infoStyles.CompareInfoHead}>
              <Typography variant="h3">
                {CompareInfoConstant.FEE_STRUCTURE}
              </Typography>
            </Box>
            <Box className={infoStyles.InfoCard}>
              <Box className={infoStyles.cardRow}>
                {feeStructureState.map((feeInfo, index) => {
                  return (
                    <Box className={infoStyles.cardColumn} key={index}>
                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {feeInfo.overallFees || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.OVERALL_FEE}
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

export default FeeStructure;
