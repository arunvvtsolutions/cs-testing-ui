'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { Lock } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

import PredictorCard from './PredictorCard';
import { PredictorData } from './dashBoardData';
import { Dashboard_Constant } from './constants';

import { useSelector } from 'store';
import useAuth from 'hooks/useAuth';

const DashBoardComponent = () => {
  const { user } = useAuth();
  const router = useRouter();
  const selectedPredictor = useSelector((state) => state.neetPredictor.neetPredictorFormData);
  return (
    <Box position="relative">
      {PredictorData &&
        PredictorData.map((predictor, index) => (
          <Box key={index} data-test-id={`predictor-card-${index}`} sx={{ position: 'relative' }}>
            <PredictorCard
              predictor={{
                ...predictor,
                PredictorType:
                  predictor.title === Dashboard_Constant.NEET_PREDICTOR
                    ? predictor.PredictorType.map((pdtor) => {
                        return {
                          ...pdtor,
                          link: selectedPredictor.neetRank ? pdtor.link : '/predictor/neet-predictor-form'
                        };
                      })
                    : predictor.PredictorType
              }}
            />
            {!user?.stream?.split(',').includes(predictor.type) && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '60%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%'
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => router.push('/my-account')}
                  startIcon={<Lock />}
                  sx={{
                    backgroundColor: '#0B6049',
                    padding: '6px 20px !important',
                    '&:hover': { backgroundColor: '#0B6049' }
                  }}
                >
                  {Dashboard_Constant.UNLOCK_BTN}
                </Button>
                <Typography mt={1} fontWeight="500" color="#000" textAlign="center">
                  {Dashboard_Constant.UNLOCK_DECS.replace(':type', capitalize(predictor.type))}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
};

export default DashBoardComponent;
