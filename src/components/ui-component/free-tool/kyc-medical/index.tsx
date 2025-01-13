/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Grid } from '@mui/material';
import { Dialog, Slide, Box } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import AdmittedSeatMatrix from './admitted-seat-matrix';
import AllotedSeatMatrix from './alloted-seat-matrix';
import AdmittedBarChart from './allotted-admitted-bar-chart';
import CutoffClosingRank from './cutoff-closing-rank';
import ResultPageInformation from './result-page-information';
import AllocationBarChart from './seats-allocation-bar-chart';
import kycStyles from './kycModal.module.css';

import { IMedCollegeProps } from 'types';
import { getMedicalCollegeDetails } from 'utils/api/get-your-college';

interface CollegeDetailModalProps {
  open: boolean;
  selecedCollege: number;
  handleClose: () => void;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const CollegeDetailModal: FC<CollegeDetailModalProps> = ({ open, handleClose, selecedCollege }) => {
  const [medCollegeData, setMedCollegeData] = useState<IMedCollegeProps>({
    admittedSeatData: {
      admittedSeatData: {
        labels: [],
        series: []
      }
    },
    allotedSeatData: {
      allotedSeatData: {
        labels: [],
        series: []
      }
    },
    closingRankData: {
      closingRankData: {
        year: 0,
        cutoffClosingRankData: []
      }
    },
    collegeInfo: {
      infoData: {
        collegeName: '',
        campusArea: '',
        establishedYear: '',
        ownership: '',
        hospitalBeds: '',
        hospitalType: '',
        seats: '',
        recognition: ''
      }
    },
    seatAdmittedData: {
      allocationYear: 0,
      previousYear: {
        series: [],
        rounds: []
      }
    },
    seatAllocationData: {
      year: 0,
      seatAllocationData: {
        series: [],
        categories: []
      }
    }
  });
  useEffect(() => {
    if (selecedCollege) {
      const getData = async () => {
        const medData = await getMedicalCollegeDetails(selecedCollege);
        setMedCollegeData(medData);
      };
      getData();
    }
  }, [selecedCollege]);

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        className={kycStyles.modalDialog}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            padding: 0
          }
        }}
      >
        <Box className={kycStyles.modalContent}>
          <Box className={kycStyles.modalContainer}>
            {/* Modal Closing backBUtton is bellow */}
            <Box className={kycStyles.modalHeader} onClick={handleClose}>
              <Box className={kycStyles.backBtnWrap}>
                <ChevronLeftIcon />
              </Box>
            </Box>
            <Box className={kycStyles.modalBody}>
              <ResultPageInformation {...medCollegeData.collegeInfo} />
              <CutoffClosingRank {...medCollegeData.closingRankData} />

              <Grid container spacing={2} className={kycStyles.modalGrid}>
                <Grid item xs={12} md={4}>
                  <Box className={kycStyles.gridBlocks}>
                    <AllotedSeatMatrix {...medCollegeData.allotedSeatData} />
                  </Box>
                  <Box className={kycStyles.gridBlocks}>
                    <AdmittedSeatMatrix {...medCollegeData.admittedSeatData} />
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Box className={kycStyles.gridBlocks}>
                    <AllocationBarChart {...medCollegeData.seatAllocationData} />
                  </Box>
                  <Box className={kycStyles.gridBlocks}>
                    <AdmittedBarChart {...medCollegeData.seatAdmittedData} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default CollegeDetailModal;
