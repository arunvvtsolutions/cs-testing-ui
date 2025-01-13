import { Box, Grid, Typography } from '@mui/material';

import styles from './NearBySection.module.css';
import { NearByTitles } from './constant';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface INearByData {
  busStand?: string;
  busStandDistance?: string;
  railway?: string;
  railwayDistance?: string;
  airport?: string;
  airportDistance?: string;
}

export interface INearByProps extends IErrorProps {
  nearByData: INearByData;
}

const NearBySection: React.FC<INearByProps> = ({ nearByData, hasError }) => {
  const allDataIsEmpty = Object.values(nearByData).every((value) => value === '');

  if (!allDataIsEmpty) {
    return (
      <>
        {hasError ? (
          <ErrorComponent />
        ) : (
          <Box data-test-id="nearby-section">
            <MainCard>
              <Box className={styles.customMaincard}>
                <Typography className={styles.title}>{NearByTitles.NEARBY}</Typography>
                <Grid container spacing={3}>
                  {nearByData?.busStand || nearByData?.busStandDistance ? (
                    <Grid item xs={12} md={6} lg={4}>
                      <Box className={styles.contactCards}>
                        {nearByData?.busStand && (
                          <Box>
                            <Typography className={styles.contactSubTitles}>{NearByTitles.BUS_STAND}</Typography>
                            <Typography className={styles.contactSubDesc}>{nearByData.busStand}</Typography>
                          </Box>
                        )}
                        {nearByData?.busStandDistance && (
                          <Box>
                            <Typography className={styles.contactSubTitles}>
                              {NearByTitles.BUS_STAND_DISTANCE}
                            </Typography>
                            <Typography className={styles.contactSubDesc}>{nearByData.busStandDistance}</Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  ) : null}
                  {nearByData?.railway || nearByData?.railwayDistance ? (
                    <Grid item xs={12} md={6} lg={4}>
                      <Box className={styles.contactCards}>
                        {nearByData?.railway && (
                          <Box>
                            <Typography className={styles.contactSubTitles}>{NearByTitles.RAILWAY_STATION}</Typography>
                            <Typography className={styles.contactSubDesc}>{nearByData.railway}</Typography>
                          </Box>
                        )}
                        {nearByData?.railwayDistance && (
                          <Box>
                            <Typography className={styles.contactSubTitles}>{NearByTitles.RAILWAY_DISTANCE}</Typography>
                            <Typography className={styles.contactSubDesc}>{nearByData.railwayDistance}</Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  ) : null}
                  {nearByData?.airport || nearByData?.airportDistance ? (
                    <Grid item xs={12} md={6} lg={4}>
                      <Box className={styles.lastCard}>
                        {nearByData?.airport && (
                          <Box>
                            <Typography className={styles.contactSubTitles}>{NearByTitles.AIRPORT}</Typography>
                            <Typography className={styles.contactSubDesc}>{nearByData.airport}</Typography>
                          </Box>
                        )}
                        {nearByData?.airportDistance && (
                          <Box>
                            <Typography className={styles.contactSubTitles}>{NearByTitles.AIRPORT_DISTANCE}</Typography>
                            <Typography className={styles.contactSubDesc}>{nearByData.airportDistance}</Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  ) : null}
                </Grid>
              </Box>
            </MainCard>
          </Box>
        )}
      </>
    );
  }
  return null; // Hide the component if all data is empty.
};
export default NearBySection;
