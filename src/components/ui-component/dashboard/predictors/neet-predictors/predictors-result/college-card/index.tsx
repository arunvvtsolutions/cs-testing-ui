import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { BookmarkAddOutlined } from '@mui/icons-material';
import Image from 'next/image';

import styles from '../style.module.css';
import { ICollegeDataProps } from '../predictor-college-list';
import { PREDICTOR_RESULT } from '../constant';
import { IPrectorBannerProps } from '../../college-detail-modal/predictor-modal-banner';

import { converYaxis } from 'utils';

const CollegeCard = ({
  collegeData,
  handleBookmark,
  bookmarkedColleges,
  handleOpenModel
}: {
  collegeData: ICollegeDataProps;
  handleBookmark: (collegeId: ICollegeDataProps) => void;
  bookmarkedColleges: ICollegeDataProps[];
  handleOpenModel: (collegeDat: IPrectorBannerProps) => void;
}) => {
  const chanceLevel = [
    {
      levelName: 'Good',
      level: 'good',
      icon: '/assets/images/icons/goodSmiley.svg',
      className: styles.statusGoodChip
    },
    {
      level: 'medium',
      levelName: 'Medium',
      icon: '/assets/images/icons/mediumSmiley.svg',
      className: styles.statusMediumChip
    },
    {
      levelName: 'Low',
      level: 'low',
      icon: '/assets/images/icons/lowSmiley.svg',
      className: styles.statusLowChip
    }
  ];

  // find level
  const findChanceLevel = () => {
    return chanceLevel.find((level) => level.level === collegeData.chance);
  };

  // find bookmark
  const findBookmark = () => {
    return bookmarkedColleges.find((clg) => clg.id === collegeData.id);
  };

  return (
    <Stack direction="column" spacing={2} className={styles.collegeCard} width="100%">
      <Box>
        <Typography
          className={styles.collegeName}
          data-test-id={`neet-predictor-college-${collegeData.name}`}
          onClick={() =>
            handleOpenModel({
              id: collegeData.id,
              collegeName: collegeData.name,
              city: collegeData.city,
              image: collegeData.logo,
              state: collegeData.state
            })
          }
        >
          {collegeData.name}
        </Typography>
        <Box className={styles.subTxtBox}>
          <Typography className={styles.locationName} data-test-id={`neet-predictor-location-${collegeData.id}`}>{`${
            collegeData.city ? collegeData.city + ',' : ''
          } ${collegeData.state}`}</Typography>
          <Box display="flex" flexDirection="row" className={styles.feesStructureBox}>
            <Typography className={styles.feesStructureTxt} data-test-id={`neet-predictor-fees-${collegeData.id}`}>
              {PREDICTOR_RESULT.FEES_LABEL}: {converYaxis(collegeData.fees.replaceAll(',', ''))}
            </Typography>{' '}
            <span className={styles.horizontalLine}>|</span>
            <Typography className={styles.feesStructureTxt}>
              {PREDICTOR_RESULT.SEAT_LABEL} {collegeData.seat}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider className={styles.divider} />
      <Box className={styles.bottomBox}>
        <Chip
          data-test-id={`neet-predictor-chip-for-chance-${collegeData.id}`}
          icon={
            <Image
              data-test-id={`neet-predictor-chip-img-for-chance-${collegeData.id}`}
              src={findChanceLevel()?.icon || ''}
              width="20"
              height="20"
              alt={findChanceLevel()?.levelName || ''}
            />
          }
          size="medium"
          className={`${styles.chip} ${findChanceLevel()?.className}`}
          label={findChanceLevel()?.levelName || ''}
        />

        <Chip
          data-test-id={`neet-predictor-chip-for-fees-${collegeData.id}`}
          size="medium"
          className={`${styles.chip} ${styles.feesStructureChip}`}
          label={`${PREDICTOR_RESULT.FEES_LABEL}: ${converYaxis(collegeData.fees.replaceAll(',', ''))} | ${
            PREDICTOR_RESULT.SEAT_LABEL
          } ${collegeData.seat}`}
        />
        <Chip
          data-test-id={`neet-predictor-chip-for-bookmark-${collegeData.id}`}
          component="button"
          icon={<BookmarkAddOutlined fontSize={'small'} sx={{ color: findBookmark() ? 'white !important' : '' }} />}
          onClick={() => handleBookmark(collegeData)}
          size="medium"
          className={`${findBookmark() ? styles.selectedBookmarkChip : styles.bookmarkChip} ${styles.chip}`}
          label={PREDICTOR_RESULT.BOOKMARK_LABEL}
        />
      </Box>
    </Stack>
  );
};

export default CollegeCard;
