import { Box, Grid, Typography } from '@mui/material';

import styles from './CourseIntake.module.css';
import { IntakeTitles } from './constant';

import { IErrorProps } from 'types';

export interface IIntakeProps extends IErrorProps {
  courseIntakedata: { intake: number; recognizedStatus: string };
}
const CourseIntake: React.FC<IIntakeProps> = ({ courseIntakedata }) => {
  return (
    <Box className="emptyCard">
      <Typography className={styles.intaketitle}>{IntakeTitles.INDIVIDUAL_COURSE_INTAKE}</Typography>
      <Box className={styles.intakeCard}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box className={` ${styles.intakeMainCard} ${styles.intakeFirstCard}`}>
              <Typography className={styles.intakeContent}>
                {courseIntakedata.intake || courseIntakedata.intake !== 0 ? courseIntakedata.intake : '-'}
              </Typography>
              <Typography className={styles.intakeSubContent}>{IntakeTitles.INTAKE}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box className={styles.intakeMainCard}>
              <Typography className={`${styles.intakeContent} ${styles.intakeBottom}`}>
                {courseIntakedata.recognizedStatus ? courseIntakedata.recognizedStatus : '-'}
              </Typography>
              <Typography className={styles.intakeSubContent}>{IntakeTitles.RECOGNIZED_STATUS}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default CourseIntake;
