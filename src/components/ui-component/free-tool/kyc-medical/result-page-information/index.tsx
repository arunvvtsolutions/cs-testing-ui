import { Box, List, ListItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import styles from './ResultPage.module.css';
import { ResultInformationTitles } from './constant';

import FreeToolCard from 'ui-component/common/cards/freetool-card/FreeToolCard';
import FreeToolListCard from 'ui-component/common/cards/freetool-card/FreeToolListCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IResultInfoProps extends IErrorProps {
  infoData: {
    collegeName: string;
    campusArea: string;
    establishedYear: string;
    ownership: string;
    hospitalBeds: string;
    hospitalType: string;
    seats: string;
    recognition: string;
  };
}

const ResultPageInformation: React.FC<IResultInfoProps> = ({ infoData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box className={styles.container}>
          {infoData.collegeName && (
            <>
              <Typography className="dashBoard_h3">{infoData.collegeName}</Typography>
              <Typography className={styles.subTitle}>{ResultInformationTitles.MEDICAL_UNIVERSITY_COLLEGES}</Typography>
            </>
          )}
          <Grid container spacing={2}>
            {Object.values(infoData).some((info) => info) && (
              <Grid item md={6} xs={12}>
                <FreeToolListCard>
                  <List>
                    <ListItem className={styles.infoList}>
                      <Typography className={styles.infoListData}>{infoData.campusArea || '-'}</Typography>
                      <Typography className={styles.infoListStaticData}>
                        {ResultInformationTitles.CAMPUS_AREA}
                      </Typography>
                    </ListItem>
                    <ListItem className={styles.infoList}>
                      <Typography className={styles.infoListData}>{infoData.establishedYear || '-'}</Typography>
                      <Typography className={styles.infoListStaticData}>
                        {ResultInformationTitles.ESTABLISHED_YEAR}
                      </Typography>
                    </ListItem>
                    <ListItem className={styles.infoList}>
                      <Typography className={styles.infoListData}>{infoData.ownership || '-'}</Typography>
                      <Typography className={styles.infoListStaticData}>{ResultInformationTitles.OWNERSHIP}</Typography>
                    </ListItem>
                    <ListItem className={styles.infoList}>
                      <Typography className={styles.infoListData}>{infoData.hospitalBeds || '-'}</Typography>
                      <Typography className={styles.infoListStaticData}>
                        {ResultInformationTitles.HOSPITAL_BED}
                      </Typography>
                    </ListItem>
                    <ListItem className={styles.infoList}>
                      <Typography className={styles.infoListData}>{infoData.hospitalType || '-'}</Typography>
                      <Typography className={styles.infoListStaticData}>
                        {ResultInformationTitles.HOSPITAL_TYPE}
                      </Typography>
                    </ListItem>
                    <ListItem className={styles.infoList}>
                      <Typography className={styles.infoListData}>{infoData.seats || '-'}</Typography>
                      <Typography className={styles.infoListStaticData}>{ResultInformationTitles.SEATS}</Typography>
                    </ListItem>
                  </List>
                </FreeToolListCard>
              </Grid>
            )}
            {infoData.recognition && (
              <Grid item md={6} xs={12}>
                <FreeToolCard>
                  {/* <Box className={styles.listCard}> */}
                  <Box className={styles.info2}>
                    <Typography className={styles.info2Data}>{infoData.recognition || '-'}</Typography>
                    <Typography className={styles.infoListStaticData}>{ResultInformationTitles.RECOGNIZED}</Typography>
                  </Box>
                  {/* </Box> */}
                </FreeToolCard>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};
export default ResultPageInformation;
