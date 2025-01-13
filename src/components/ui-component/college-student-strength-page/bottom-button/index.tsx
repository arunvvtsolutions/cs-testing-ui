import { Grid, Typography } from '@mui/material';
import Image from 'next/image';

import styles from '../students-categorywise-section/Category.module.css';
import { STUDENT_STRENGTH_CONTENT } from '../students-categorywise-section/constants';

const BottomButton = ({ categories }: { categories: string[] }) => {
  return (
    <Grid container spacing={2} className={styles.customeLabel}>
      {categories.map((cat: string) => {
        return (
          <>
            {cat.includes(STUDENT_STRENGTH_CONTENT.UGFOUR) && (
              <Grid item className={styles.customeLabel}>
                <Image src="/assets/images/icons/ugFourIcon.svg" alt="ug four label" height={12} width={12} />
                <Typography className={styles.customeLabelElement}>{STUDENT_STRENGTH_CONTENT.UG_FOUR_YEARS}</Typography>
              </Grid>
            )}
            {cat.includes(STUDENT_STRENGTH_CONTENT.UGFIVE) && (
              <Grid item className={styles.customeLabel}>
                <Image src="/assets/images/icons/ugFiveIcon.svg" alt="ug four label" height={12} width={12} />
                <Typography className={styles.customeLabelElement}>{STUDENT_STRENGTH_CONTENT.UG_FIVE_YEARS}</Typography>
              </Grid>
            )}
            {cat.includes(STUDENT_STRENGTH_CONTENT.PGTWO) && (
              <Grid item className={styles.customeLabel}>
                <Image src="/assets/images/icons/PgTwoIcon.svg" alt="ug four label" height={12} width={12} />
                <Typography className={styles.customeLabelElement}>{STUDENT_STRENGTH_CONTENT.PG_TWO_YEARS}</Typography>
              </Grid>
            )}

            {cat.includes(STUDENT_STRENGTH_CONTENT.PGTHREE) && (
              <Grid item className={styles.customeLabel}>
                <Image src="/assets/images/icons/PgThreeIcon.svg" alt="ug four label" height={12} width={12} />
                <Typography className={styles.customeLabelElement}>
                  {STUDENT_STRENGTH_CONTENT.PG_THREE_YEARS}
                </Typography>
              </Grid>
            )}
          </>
        );
      })}
    </Grid>
  );
};

export default BottomButton;
