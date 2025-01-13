'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import { PercentileToScoreBannerContants, PercentileToScorePopupContant } from './constant';

import ProfileBanner from 'ui-component/common/profile-banner';
import RankScorePopup from 'ui-component/common/rank-score-popup';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';
import useAuth from 'hooks/useAuth';
import { Stream } from 'types';

const PercentileToScoreBanner = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [percentile] = useState<string | number>(0);
  const percentileToScoreDesc: string[] = [
    PercentileToScoreBannerContants.PERCENTILE_TO_SCORE_ONE,
    PercentileToScoreBannerContants.PERCENTILE_TO_SCORE_TWO
  ];
  const [open, setOpen] = React.useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<
    | {
        rankScore: number | string;
        estimatedRank: number | string;
        percentileScore: number | string;
      }
    | undefined
  >();
  useEffect(() => {
    if (user?.stream && !user.stream.toLowerCase().includes(Stream.ENGINEERING.toLowerCase())) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.stream]);
  const handleChange = async (value: string | number) => {
    const response = await fetch(`/api/eng-percentile-to-score-api?percentile=${value}`);

    if (response.ok) {
      const data = await response.json();

      if (Number(value) > 100) {
        const errorMessage = 'The data should be between 0 and 100';
        dispatch(openSnackbar(ErrorSnackbar(errorMessage)));
        setOpen(false);
      } else {
        const scoreData = { rankScore: data || 0, estimatedRank: data || 0, percentileScore: value || 0 };
        setScoreResult(scoreData);
        if (scoreData) {
          setOpen(true);
        }
      }
    }
  };
  const handleClose = () => setOpen(false);
  return (
    <Box data-test-id="percentile-to-score-banner">
      <ProfileBanner
        title={PercentileToScoreBannerContants.TITLE}
        bannerDesc={PercentileToScoreBannerContants.TITLE_DESC}
        descPoints={percentileToScoreDesc}
        handleChange={handleChange}
        value={percentile}
        formHeading={PercentileToScoreBannerContants.FORM_HEADING}
        placeHolder={PercentileToScoreBannerContants.FORM_PLACEHOLDER}
      />
      <RankScorePopup
        RankScoreData={scoreResult || { rankScore: 0, estimatedRank: 0, percentileScore: 0 }}
        constantData={{
          TITLE: PercentileToScorePopupContant.TITLE,
          SUB_TEXT: PercentileToScorePopupContant.SUB_TEXT,
          FOOT_CONTENT: PercentileToScorePopupContant.FOOT_CONTENT,
          BASED_ON: PercentileToScorePopupContant.BASED_ON
        }}
        openPopup={open}
        handleClose={handleClose}
      />
    </Box>
  );
};
export default PercentileToScoreBanner;
