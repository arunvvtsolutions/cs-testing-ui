import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { OtherCollegeContent } from './constant';
import Location from './assets/image/location.svg';
import styles from './OtherCollege.module.css';

import { IErrorProps, IInnerPageParams } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IOtherCollege {
  id: number;
  name?: string;
  url: string;
  shortUrl: string;
  shortName?: string;
  logo: string;
  city?: string;
  collegeCityUrl?: string;
}

interface IOtherCollegeDataProps {
  otherColleges: IOtherCollege[];
}

export interface IOtherCollegeProps extends IErrorProps {
  otherCollegeData: IOtherCollegeDataProps;
}

const OtherColleges: React.FC<IOtherCollegeProps> = ({ otherCollegeData, hasError }) => {
  const theme = useTheme();
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        otherCollegeData.otherColleges.length > 0 && (
          <Box className={styles.mainBox} data-test-id="overview-sidebar">
            <Box className={styles.subMainBox}>
              <Box className={styles.headingBox}>
                <Typography className={styles.heading}>{OtherCollegeContent.TITLE}</Typography>
              </Box>
              <Box className={styles.fullContentBox}>
                {otherCollegeData.otherColleges &&
                  otherCollegeData.otherColleges.map((data) => (
                    <Grid
                      container
                      key={data.id}
                      className={styles.contentBox}
                      data-test-id={`overview-sidebar-${data.id}`}
                    >
                      <Grid item xs={11} md={8}>
                        <Box className={styles.collegeNameBox}>
                          {matchDownlg && (
                            <Image
                              src={`/assets/images/cs/${data.logo}`}
                              alt={`${data.name}`}
                              width={40}
                              height={40}
                              style={{ marginRight: '9px' }}
                              data-test-id={`overview-sidebar-${data.logo}`}
                            />
                          )}
                          <Link
                            key={data.id}
                            href={`/${ins}/${data.shortUrl}/overview`}
                            as={`/${ins}/${data.shortUrl}/overview`}
                            className={styles.collegeName}
                            aria-label={`Navigate to ${data.name} overview`}
                            data-test-id={`overview-sidebar-${data.name}`}
                          >
                            {data.name}
                          </Link>
                        </Box>
                        <Box className={styles.locationBox}>
                          <Image src={Location} alt="Location icon" />
                          <Typography className={styles.locationName}>{data.city}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1} md={4} className={styles.buttonBox} data-test-id="overview-sidebar-mobile">
                        {matchDownlg ? (
                          <Box className={styles.iconBox}>
                            <Link
                              key={data.id}
                              href={`/${ins}/${data.shortUrl}/overview`}
                              as={`/${ins}/${data.shortUrl}/overview`}
                              style={{ justifyContent: 'center', display: 'flex' }}
                              aria-label={`View details of ${data.name}`}
                              data-test-id={`overview-sidebar-view-mobile-${data.name}`}
                            >
                              <KeyboardArrowRightIcon className={styles.icon} />
                            </Link>
                          </Box>
                        ) : (
                          <Link
                            key={data.id}
                            href={`/${ins}/${data.shortUrl}/overview`}
                            as={`/${ins}/${data.shortUrl}/overview`}
                            className={styles.viewLink}
                            aria-label={`View details of ${data.name}`}
                            data-test-id={`overview-sidebar-view-${data.name}`}
                          >
                            {OtherCollegeContent.VIEW}
                          </Link>
                        )}
                      </Grid>
                    </Grid>
                  ))}
              </Box>
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default OtherColleges;
