'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import { PercentileToRankBannerContants, PercentileToRankPopupContant } from './constant';

import ProfileBanner from 'ui-component/common/profile-banner';
import RankScorePopup from 'ui-component/common/rank-score-popup';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import useAuth from 'hooks/useAuth';
import { Stream } from 'types';
// import { getPercentileData } from 'store/slices/percentile-to-rank';
const PercentileToRankBanner = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [percentile] = useState<string | number>(0);
  const percentileToRankDesc: string[] = [
    PercentileToRankBannerContants.PERCENTILE_TO_RANK_DESC_ONE,
    PercentileToRankBannerContants.PERCENTILE_TO_RANK_DESC_TWO,
    PercentileToRankBannerContants.PERCENTILE_TO_RANK_DESC_THREE
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
    const response = await fetch(`/api/eng-percentile-to-rank-api?percentileToRank=${value}`);

    if (response.ok) {
      const data = await response.json();

      if (Number(value) > 100) {
        const errorMessage = 'The data should be between 0 and 100';
        dispatch(openSnackbar(ErrorSnackbar(errorMessage)));
        setOpen(false);
      } else {
        const percentileData = { rankScore: data || 0, estimatedRank: data || 0, percentileScore: value || 0 };
        setScoreResult(percentileData);
        if (percentileData) {
          setOpen(true);
        }
      }
    }
  };
  const handleClose = () => setOpen(false);
  return (
    <Box data-test-id="percentile-to-rank-banner">
      <ProfileBanner
        title={PercentileToRankBannerContants.TITLE}
        bannerDesc={PercentileToRankBannerContants.TITLE_DESC}
        descPoints={percentileToRankDesc}
        handleChange={handleChange}
        value={percentile}
        formHeading={PercentileToRankBannerContants.FORM_HEADING}
        placeHolder={PercentileToRankBannerContants.FORM_PLACEHOLDER}
      />
      <RankScorePopup
        RankScoreData={scoreResult || { rankScore: 0, estimatedRank: 0, percentileScore: 0 }}
        constantData={{
          TITLE: PercentileToRankPopupContant.TITLE,
          SUB_TEXT: PercentileToRankPopupContant.SUB_TEXT,
          FOOT_CONTENT: PercentileToRankPopupContant.FOOT_CONTENT,
          BASED_ON: PercentileToRankPopupContant.BASED_ON
        }}
        openPopup={open}
        handleClose={handleClose}
      />
    </Box>
  );
};
export default PercentileToRankBanner;
