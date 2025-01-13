import React from 'react';
import { Grid, Typography, useTheme, useMediaQuery, Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import Slider from 'react-slick';
import { useRouter } from 'next/router';

import styles from './Exams.module.css';
import { ExamsAndCutoff } from './constant';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IExamsAndCutoffs {
  id?: number;
  title?: string;
  examMode?: number;
  startDate: number;
  url: string;
  examLinks: string[];
}

interface IExamDataProps {
  shortName?: string;
  examMode: IExamsAndCutoffs[];
}

export interface IExamsAndCutoffsProps extends IErrorProps {
  examData: IExamDataProps;
}

const ExamsAndCutoffs: React.FC<IExamsAndCutoffsProps> = ({ examData, hasError }) => {
  const theme = useTheme();
  const router = useRouter();
  const slider = React.useRef<Slider | null>(null);
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
  const { ins, name } = router.query;
  //react-slick settings
  const sliderSettings = {
    infinite: examData.examMode.length > 1 ? true : false,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.02,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          {examData.examMode && examData.examMode.length > 0 && (
            <MainCard data-test-id="overview-exams-cutoffs">
              <Box>
                <Box className={styles.headingBox}>
                  <Typography className="subHeadText">
                    {examData.shortName} {ExamsAndCutoff.TITLE}
                  </Typography>
                  {!isMdBreakpoint && (
                    <Link
                      href={`/${ins}/${name}/cutoff`}
                      className="linkTxt "
                      data-test-id="overview-exams-cutoffs-viewall"
                    >
                      {ExamsAndCutoff.VIEW_ALL}
                    </Link>
                  )}
                </Box>
              </Box>
              <Box className={styles.swipperBox}>
                <Slider ref={slider} {...sliderSettings}>
                  {examData.examMode.map((eItem) => {
                    return (
                      <>
                        <Box className="sliderColumn" key={eItem.id}>
                          <Box className={styles.examContentBox}>
                            <Link href="#" className={styles.examTitle} tabIndex={-1}>
                              {eItem.title}
                            </Link>
                            <Grid container className={styles.examModeAndDate}>
                              <Grid xs={6}>
                                <Box className={styles.examMode}>
                                  <Typography className={styles.examModeKey}>{ExamsAndCutoff.EXAM_MODE}</Typography>
                                  <Typography style={{ margin: 'auto 0px' }}>-</Typography>
                                  <Typography className={styles.examModeValue}>{eItem.examMode}</Typography>
                                </Box>
                              </Grid>
                              <Grid xs={6} className={styles.examDateBox}>
                                <Typography className={styles.examDate}>
                                  {new Date(eItem.startDate * 1000).toLocaleDateString()}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid xs={6}>
                                <Box className={styles.examlinkBox}>
                                  {eItem.examLinks
                                    .slice(0, Math.floor(eItem.examLinks.length / 2))
                                    .map((examLink, index) => (
                                      <Link
                                        href="#"
                                        key={index}
                                        className={styles.examLink}
                                        tabIndex={-1}
                                        aria-hidden="false"
                                      >
                                        {examLink}
                                      </Link>
                                    ))}
                                </Box>
                              </Grid>
                              <Grid xs={6} className={styles.secondHalfLinks}>
                                <Box className={styles.examlinkBox}>
                                  {eItem.examLinks
                                    .slice(Math.floor(eItem.examLinks.length / 2))
                                    .map((examLink, index) => (
                                      <Link
                                        href="#"
                                        key={index}
                                        className={styles.examLink}
                                        aria-hidden="false"
                                        tabIndex={-1}
                                      >
                                        {examLink}
                                      </Link>
                                    ))}
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </>
                    );
                  })}
                </Slider>
              </Box>
              {isMdBreakpoint && (
                <Link
                  href={`/${ins}/${name}/cutoff`}
                  className="viewAllLink"
                  data-test-id="overview-exams-cutoffs-mobile-viewall"
                >
                  {ExamsAndCutoff.VIEW_ALL}
                  <ChevronRightIcon style={{ color: '#FFF' }} />
                </Link>
              )}
            </MainCard>
          )}
        </>
      )}
    </>
  );
};
export default ExamsAndCutoffs;
