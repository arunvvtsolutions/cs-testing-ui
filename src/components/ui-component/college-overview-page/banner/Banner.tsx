import { Box, Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import campus from '../../../../../public/assets/images/cs/campus.webp';

import { BannerConst } from './constant';
import styles from './Banner.module.css';

import { IInnerPageParams } from 'types';
interface IBannerProps {
  bannerData: {
    name?: string;
    city?: string;
    state?: string;
    logo: string;
    naacGrade?: string;
    type?: string;
    videoId?: string;
  };
  handleOpenPop: () => void;
}

interface iBreadCrumbProps {
  [key: string]: string;
}

const Banner: React.FC<IBannerProps> = ({ bannerData, handleOpenPop }) => {
  const thumbnailUrl = `https://i.ytimg.com/vi/${bannerData.videoId}/maxresdefault.jpg`;
  const [activePage, setActivePage] = useState<string>('');
  const searchParams = useParams<IInnerPageParams>();
  const asPath = usePathname();
  const ins = searchParams?.ins;
  const name = searchParams?.name;
  const courseName = searchParams?.courseName;
  const segments = asPath?.split('/');

  useEffect(() => {
    const activePageName = segments?.[segments.length - 1];
    activePageName && setActivePage(activePageName);
  }, [segments]);

  const breadCrumbs: iBreadCrumbProps = {
    overview: 'Overview',
    'admission-eligibility': 'Admission & Eligibility',
    'affiliated-college': 'Affiliated College',
    amenities: 'Amenities',
    contact: 'Contact',
    'course-fees': 'Course & Fees',
    cutoff: 'Cutoff',
    faculty: 'Faculty',
    pictures: 'Pictures',
    placement: 'Placements',
    questions: 'Q&A',
    review: 'Review',
    'student-strength': 'Student Strength',
    'question-answer': 'Q&A',
    'fees-structure': 'Fees Structure'
  };

  return (
    <Box className={styles.bannerContainer} data-test-id={`${activePage}-main-banner`}>
      <Grid container>
        <Grid item xs={12} lg={bannerData.videoId !== null ? 6 : 12} md={12}>
          <Box className={styles.collegeIconBox}>
            <Image
              src={bannerData.logo ? `/assets/images/cs/${bannerData.logo}` : campus}
              alt={bannerData.name ?? ''}
              width={48}
              height={48}
              data-test-id={`${activePage}-banner-${bannerData.logo}`}
              onError={(e) => {
                e.currentTarget.src = `${campus}`;
                e.currentTarget.srcset = `${campus}`;
              }}
            />
            {bannerData.videoId && (
              <Box className={styles.youtubeLinkBox}>
                <Image src="/assets/images/overview-images/youtube.svg" width={20} height={20} alt="" />
                <Typography onClick={handleOpenPop} className={styles.youtubeLink}>
                  {BannerConst.WATCHOUT_NAME}
                </Typography>
              </Box>
            )}
          </Box>
          <Box>
            {courseName && (
              <Box className={styles.subheaderBox}>
                <Typography className={styles.collegeSubheader}>{bannerData.name}</Typography>
              </Box>
            )}
            <Typography className={`${styles.bannerHeading} ${courseName && 'txtCapitlize'}`}>
              {courseName ? courseName.toString().replaceAll('-', ' ') : bannerData.name}
            </Typography>
            <Typography className={styles.universityText}>{BannerConst.UNIVERSITY_INDIA}</Typography>
            <Box className={styles.locationLine}>
              <Image src="/assets/images/overview-images/locationlogo.svg" width={18} height={18} alt="" />
              <Typography className={styles.locationText}>
                {bannerData.city}, {bannerData.state}
                {bannerData.naacGrade && (
                  <>
                    ,
                    <Typography className={styles.naacGradeText}>
                      {BannerConst.NAAC_GRADE}: {bannerData.naacGrade}
                    </Typography>
                  </>
                )}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.linkBox}>
            <Link href={`/`} as={`/`} className={styles.links} data-test-id={`${activePage}-main-banner-home`}>
              {BannerConst.HOME_LINK}
            </Link>
            <span className={styles.breadDiver}>/</span>
            <Link
              href={`/top/${bannerData.type?.toLowerCase()}/colleges-in-india`}
              className={styles.links}
              data-test-id={`${activePage}-main-banner-type`}
            >
              {bannerData.type}
            </Link>
            <span className={styles.breadDiver}>/</span>
            <Link
              href={`/${ins}/${name}/overview`}
              className={styles.collegeText}
              data-test-id={`${activePage}-main-banner-college-name`}
            >
              {bannerData.name}
            </Link>
            {courseName && (
              <>
                <span className={styles.breadDiver}>/</span>
                <Link href={`/${ins}/${name}/course-fees`} className={styles.collegeText}>
                  {BannerConst.COURSEFEE}
                </Link>
                <span className={styles.breadDiver}>/</span>
                <Typography className={styles.collegeText}>{courseName.toString().replaceAll('-', ' ')}</Typography>
              </>
            )}

            <span className={styles.breadDiver}>/</span>
            <Typography className={styles.currentPageTextactive}>{breadCrumbs[activePage]}</Typography>
          </Box>
        </Grid>
        {bannerData.videoId !== null && (
          <Grid container xs={12} lg={6} md={6} className={styles.computerBox}>
            <Box className={styles.uBoxContent}>
              <Box className={styles.uBoxContentWarp}>
                <Image
                  src="/assets/images/overview-images/computerframe.webp"
                  layout="fill"
                  alt=""
                  className={styles.computer}
                />
                <Image src={thumbnailUrl} alt="" className={styles.thumbContent} width={100} height={100} />
                <Button
                  onClick={handleOpenPop}
                  className={styles.btn}
                  data-test-id={`${activePage}-main-banner-watchnow`}
                >
                  <Image src="/assets/images/overview-images/youtube.svg" width={20} height={20} alt="" />
                  <Typography className={styles.buttonText}>{BannerConst.WATCHOUT_NAME}</Typography>
                </Button>
                <Box className={styles.buttonsection}></Box>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Banner;
