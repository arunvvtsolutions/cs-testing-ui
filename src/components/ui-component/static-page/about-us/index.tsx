import { Box, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { AboutUsTitles } from './constant';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <>
      <Box className="containerWrapper">
        <Box className={styles.overallBox}>
          <Box className={styles.staticCard}>
            <Typography className={styles.staticTitle}>{AboutUsTitles.ABOUT_US}</Typography>
            <Divider className={styles.borderLine} />
            <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
              {AboutUsTitles.ABOUT_US_DESCP_1}
            </Typography>
            <Typography className={`${styles.staticDiscp} ${styles.singleDiscp}`}>
              {AboutUsTitles.ABOUT_US_DESCP_2}
            </Typography>
          </Box>
          <Box>
            <Typography className={`${styles.staticSubTitle} ${styles.csDetails}`}>
              {AboutUsTitles.IN_OUR_COLLEGE_SUGGEST}
            </Typography>
            <Grid container className={styles.gridContainer}>
              <Grid item className={styles.gridSection}>
                <Typography className={styles.numbers}>{AboutUsTitles.NUMBER_1}</Typography>
                <Typography className={`${styles.staticDiscp} ${styles.numberDiscp}`}>
                  {AboutUsTitles.COLLEGES}
                </Typography>
              </Grid>
              <Grid item className={styles.gridSection}>
                <Typography className={styles.numbers}>{AboutUsTitles.NUMBER_2}</Typography>
                <Typography className={`${styles.staticDiscp} ${styles.numberDiscp}`}>
                  {AboutUsTitles.COURSES}
                </Typography>
              </Grid>
              <Grid item className={styles.gridSection}>
                <Typography className={styles.numbers}>{AboutUsTitles.NUMBER_3}</Typography>
                <Typography className={`${styles.staticDiscp} ${styles.numberDiscp}`}>{AboutUsTitles.EXAMS}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Image
            src="/assets/images/static-page/cs-static.webp"
            alt="CS_ABOUT_US"
            className={styles.aboutImage}
            layout="fill"
          />
          <Link href="https://www.youtube.com/@CollegeSuggest" target="_blank" className={styles.watchOut}>
            <Typography className={styles.staticSubTitle}>{AboutUsTitles.WATCH_OUT_OUR_VIDEOS}</Typography>
            <Box className={styles.youtubeIconCard}>
              <Image
                src="/assets/images/static-page/logos_youtube-icon.svg"
                width={34}
                height={24}
                alt="CS_ABOUT_US"
                className={styles.youtubeIcon}
              />
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  );
};
export default AboutUs;
