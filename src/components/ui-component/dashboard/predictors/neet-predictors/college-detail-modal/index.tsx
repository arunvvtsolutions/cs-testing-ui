/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Grid } from '@mui/material';
import { Dialog, Slide, Button, Box } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { DetailModalTitles } from './constant';
import styles from './DetailsModalstyles.module.css';
import PredictorModalBanner, { IPrectorBannerProps } from './predictor-modal-banner';
import PredictorBasicInfo from './predictor-basic-info';

import kycStyles from 'ui-component/free-tool/kyc-medical/kycModal.module.css';
import CutoffClosingRank from 'ui-component/free-tool/kyc-medical/cutoff-closing-rank';
// import data from 'ui-component/free-tool/kyc-medical/cutoff-closing-rank/ClosingRankMockupData.json';
import AllotedSeatMatrix from 'ui-component/free-tool/kyc-medical/alloted-seat-matrix';
import AdmittedSeatMatrix from 'ui-component/free-tool/kyc-medical/admitted-seat-matrix';
import AllocationBarChart from 'ui-component/free-tool/kyc-medical/seats-allocation-bar-chart';
import AdmittedBarChart from 'ui-component/free-tool/kyc-medical/allotted-admitted-bar-chart';
import { IPredictorCollegeProps } from 'types';
import { getPredictorCollegeDetails } from 'utils/api/predictor-detail-model';

interface ICollegeDetailModalProps {
  open: boolean;
  selectedCollege: IPrectorBannerProps;
  handleClose?: () => void;
}
// Custom transition component for sliding in from the right
const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const PredictorsClgDetailModal: React.FC<ICollegeDetailModalProps> = ({ selectedCollege, open, handleClose }) => {
  const [predictorCollegeData, setPredictorCollegeData] = useState<IPredictorCollegeProps>({
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
    stateClosingRankData: {
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
    if (selectedCollege) {
      const getData = async () => {
        const detailData = await getPredictorCollegeDetails(selectedCollege.id);
        setPredictorCollegeData(detailData);
      };
      getData();
    }
  }, [selectedCollege]);
  const isAllEmpty = (data: any) => Object.values(data).every((value) => value === '');
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
        <Box className={styles.modalContent}>
          <Box className={styles.modalContainer}>
            <Box className={styles.modalContentHead}>
              {/*NOTE: please add this button function to predictors card later remove it  */}
              <Button variant="contained" className={styles.BackBtn} onClick={handleClose}>
                <KeyboardArrowLeftIcon />
                <span>{DetailModalTitles.GO_BACk}</span>
              </Button>
            </Box>
            <PredictorModalBanner bannerData={selectedCollege} />

            {isAllEmpty(predictorCollegeData.collegeInfo.infoData) ? null : (
              <PredictorBasicInfo {...predictorCollegeData.collegeInfo} />
            )}

            {predictorCollegeData.closingRankData.closingRankData.cutoffClosingRankData.length > 0 && (
              <Box className={styles.cutOffBlock}>
                <CutoffClosingRank
                  {...predictorCollegeData.closingRankData}
                  closingRankTitles={DetailModalTitles.AIQ_CUT_OFFS_CLOSING_RANK}
                />
              </Box>
            )}

            <Box className={kycStyles.modalGrid}>
              {(predictorCollegeData.seatAllocationData.seatAllocationData.categories.length > 0 ||
                predictorCollegeData.allotedSeatData.allotedSeatData.series.length > 0) && (
                <Grid container spacing={2}>
                  {predictorCollegeData.allotedSeatData.allotedSeatData.series.length > 0 && (
                    <Grid item xs={12} md={4} className={kycStyles.rowLay}>
                      <Box className={kycStyles.gridBlocks}>
                        <AllotedSeatMatrix {...predictorCollegeData.allotedSeatData} />
                      </Box>
                    </Grid>
                  )}

                  {predictorCollegeData.seatAllocationData.seatAllocationData.categories.length > 0 && (
                    <Grid item xs={12} md={8}>
                      <Box className={kycStyles.gridBlocks}>
                        <Box className={kycStyles.barBlocks}>
                          <AllocationBarChart {...predictorCollegeData.seatAllocationData} />
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}

              {predictorCollegeData.stateClosingRankData.closingRankData.cutoffClosingRankData.length > 0 && (
                <Grid item xs={12} md={12}>
                  <Box className={styles.cutOffBlock}>
                    <CutoffClosingRank
                      {...predictorCollegeData.stateClosingRankData}
                      closingRankTitles={DetailModalTitles.STATEWISE_CUT_OFFS_CLOSING_RANK}
                    />
                  </Box>
                </Grid>
              )}

              {(predictorCollegeData.admittedSeatData.admittedSeatData?.series?.length > 0 ||
                predictorCollegeData.seatAdmittedData?.previousYear.rounds?.length > 0) && (
                <Grid container spacing={2}>
                  {predictorCollegeData &&
                    predictorCollegeData.admittedSeatData.admittedSeatData?.series?.length > 0 && (
                      <Grid item xs={12} md={4} className={kycStyles.rowLay}>
                        <Box className={kycStyles.gridBlocks}>
                          <AdmittedSeatMatrix {...predictorCollegeData.admittedSeatData} />
                        </Box>
                      </Grid>
                    )}

                  {predictorCollegeData && predictorCollegeData.seatAdmittedData?.previousYear.rounds?.length > 0 && (
                    <Grid item xs={12} md={8}>
                      <Box className={kycStyles.gridBlocks}>
                        <Box className={kycStyles.barBlocks}>
                          <AdmittedBarChart {...predictorCollegeData.seatAdmittedData} />
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default PredictorsClgDetailModal;
