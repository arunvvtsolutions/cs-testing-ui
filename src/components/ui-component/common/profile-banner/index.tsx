import React, { useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { ReadMoreOrLess } from '../../../../constants';

import styles from './profileBanner.module.css';
import BannerForm from './banner-form';

import { ContainerWrapper } from 'ui-component/home/banner-page/styles';

interface IFormDataProps {
  collegeId: number;
  name: string;
  shortUrl: string;
  shortName: string;
}
interface IProfileBannerProps {
  title: string;
  bannerDesc: string;
  descPoints: string[];
  formData?: IFormDataProps[];
  showDropDown?: boolean;
  handleSelect?: (e: string | number, shortUrl?: string) => void;
  value: string | number;
  formHeading: string;
  placeHolder: string;
  handleChange?: (e: string | number) => void;
}
const ProfileBanner: React.FC<IProfileBannerProps> = ({
  title,
  bannerDesc,
  descPoints,
  formData,
  showDropDown = false,
  handleSelect,
  value,
  formHeading,
  placeHolder,
  handleChange
}) => {
  const theme = useTheme();
  const [openReadMore, setOpenReadMore] = useState(false);
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    setOpenReadMore((prevValue) => !prevValue);
  };
  return (
    <ContainerWrapper>
      <Box>
        <Box className={styles.bannerSection}>
          <Box className={styles.bannerTitleWrapper}>
            <Typography className={`dashBoard_h2 ${styles.bannerTitle}`}>{title}</Typography>
          </Box>
          <Box className={styles.bannerDescWrapper}>
            <Box className={styles.bannerDescItemWrapper}>
              <Typography className={`dashBoardPara ${styles.bannerDesc}`}>{bannerDesc}</Typography>
            </Box>
          </Box>
          <Box className={styles.readMoreWrapper}>
            <Button onClick={handleClick} className={`dashBoardListText ${styles.readMoreBtn}`}>
              {openReadMore ? ReadMoreOrLess.READ_LESS : ReadMoreOrLess.READ_MORE}
              <KeyboardArrowDownIcon className={`${styles.readMoreIcon} ${openReadMore && styles.rotate}`} />
            </Button>
          </Box>
          <Grid container spacing={4}>
            <Grid
              item
              sm={12}
              md={7}
              style={isMdBreakpoint ? (openReadMore ? { display: 'block' } : { display: 'none' }) : undefined}
            >
              <Box className={styles.descWrapper}>
                {descPoints &&
                  descPoints.map((desc, index) => (
                    <Box key={index} className={styles.descItemWrapper}>
                      <Brightness1RoundedIcon className={styles.descIcon} />
                      <Typography className={`dashBoardListText ${styles.iqDesc}`}>{desc}</Typography>
                    </Box>
                  ))}
              </Box>
            </Grid>
            <Grid item sm={12} md={5} className={styles.bannerFormWrapper}>
              <BannerForm
                collegeData={formData}
                showDropDown={showDropDown}
                handleSelect={handleSelect}
                value={value}
                formHeading={formHeading}
                placeHolder={placeHolder}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ContainerWrapper>
  );
};
export default ProfileBanner;
