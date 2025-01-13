'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import { ScoreToRankBannerContants, ScoreToRankPopupContant } from './constant';

import ProfileBanner from 'ui-component/common/profile-banner';
import RankScorePopup from 'ui-component/common/rank-score-popup';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';
import useAuth from 'hooks/useAuth';
import { getScoreToRank } from 'utils/api/get-your-college';
import { Stream } from 'types';
import { findStream } from 'utils';
// import RankScoreData from 'ui-component/common/rank-score-popup/rankScoreData.json';

const ScoreToRankBanner = ({ stream }: { stream: 'engineering' | 'medical' }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [score] = useState<string | number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [rankResult, setRankResult] = useState<
    | {
        rankScore: number | string;
        estimatedRank: number | string;
        percentileScore: number | string;
      }
    | undefined
  >();

  const scoreToRankDesc: string[] = [
    ScoreToRankBannerContants.SCORE_TO_RANK_ONE.replace(
      ScoreToRankBannerContants.REPLACE_TITLE_KEY,
      stream === Stream.ENGINEERING ? ScoreToRankBannerContants.JEE : ScoreToRankBannerContants.NEET
    ),
    ScoreToRankBannerContants.SCORE_TO_RANK_TWO,
    ScoreToRankBannerContants.SCORE_TO_RANK_THREE.replace(
      ScoreToRankBannerContants.REPLACE_TITLE_KEY,
      stream === Stream.ENGINEERING ? ScoreToRankBannerContants.JEE : ScoreToRankBannerContants.NEET
    )
  ];
  useEffect(() => {
    const { subStream } = findStream(pathname || '');

    if (
      user?.stream &&
      ((subStream.includes(Stream.MEDICAL.toLowerCase()) &&
        !user.stream.toLowerCase().includes(Stream.MEDICAL.toLowerCase())) ||
        (subStream.includes(Stream.ENGINEERING.toLowerCase()) &&
          !user.stream.toLowerCase().includes(Stream.ENGINEERING.toLowerCase())))
    ) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.stream]);
  const handleChange = async (value: string | number) => {
    try {
      const limit = stream === Stream.ENGINEERING ? 300 : 720;

      if (Number(value) > limit || Number(value) < 0) {
        dispatch(
          openSnackbar(ErrorSnackbar(ScoreToRankBannerContants.VALIDATION_ERROR_MSG.replace(':limit', `${limit}`)))
        );
        setOpen(false);
      } else {
        const data = await getScoreToRank(value, stream);
        let rank;
        if (data.rankFrom && data.rankFrom !== 0) {
          rank = `${data?.rankFrom} - ${data?.rankTo}`;
        } else if (data?.split('-')[0]) {
          const splittedData = data.split('-');
          rank = `${splittedData?.[0]} - ${splittedData?.[1]}`;
        } else rank = `${0}-${0}`;
        const rankData = {
          rankScore: rank || 0,
          estimatedRank: rank || 0,
          percentileScore: value || 0
        };
        setRankResult(rankData);
        if (rankData) {
          setOpen(true);
        }
      }
    } catch (error) {
      dispatch(openSnackbar(ErrorSnackbar(ScoreToRankBannerContants.ERROR_MSG)));
    }
  };
  const handleClose = () => setOpen(false);
  return (
    <Box data-test-id="score-to-rank-banner">
      <ProfileBanner
        title={ScoreToRankBannerContants.TITLE.replace(
          ScoreToRankBannerContants.REPLACE_TITLE_KEY,
          stream === Stream.ENGINEERING ? ScoreToRankBannerContants.JEE : ScoreToRankBannerContants.NEET
        )}
        bannerDesc={ScoreToRankBannerContants.TITLE_DESC.replace(
          ScoreToRankBannerContants.REPLACE_TITLE_KEY,
          stream === Stream.ENGINEERING ? ScoreToRankBannerContants.JEE : ScoreToRankBannerContants.NEET
        )}
        descPoints={scoreToRankDesc}
        handleChange={handleChange}
        value={score}
        formHeading={ScoreToRankBannerContants.FORM_HEADING}
        placeHolder={ScoreToRankBannerContants.FORM_PLACEHOLDER}
      />

      <RankScorePopup
        RankScoreData={rankResult || { rankScore: 0, estimatedRank: 0, percentileScore: 0 }}
        constantData={{
          TITLE: ScoreToRankPopupContant.TITLE.replace(
            ScoreToRankBannerContants.REPLACE_TITLE_KEY,
            stream === Stream.ENGINEERING ? ScoreToRankBannerContants.JEE : ScoreToRankBannerContants.NEET
          ),
          SUB_TEXT: ScoreToRankPopupContant.SUB_TEXT,
          FOOT_CONTENT: ScoreToRankPopupContant.FOOT_CONTENT.replace(
            ScoreToRankBannerContants.REPLACE_TITLE_KEY,
            stream === Stream.ENGINEERING ? ScoreToRankBannerContants.JEE : ScoreToRankBannerContants.NEET
          ),
          BASED_ON: ScoreToRankPopupContant.BASED_ON
        }}
        openPopup={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default ScoreToRankBanner;
