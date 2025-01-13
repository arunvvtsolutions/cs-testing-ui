'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { capitalize } from 'lodash';

import { ComparedHistoryTitles } from './constant';
import styles from './ComparedCollege.module.css';

import { IErrorProps, Stream, SubStream, streamCode } from 'types';
import useAuth from 'hooks/useAuth';
import { getCompareHistoryListData, removeCompare } from 'utils/api/student-dashboard';
import ErrorComponent from 'ui-component/error';
import { ENGINEERING_BASE_URL, MEDICAL_BASE_URL } from 'config';

interface ICollegedata {
  collegeId: number;
  collegeName: string;
  shortName: string;
  collegelogo: string;
  shortUrl: string;
  type: string;
}

interface IAllCollegeData {
  id: number;
  history: ICollegedata[];
}

export interface IRelatedCompareProps extends IErrorProps {
  comparedCollegeData: IAllCollegeData[];
}

const RelatedComparedCollege = () => {
  const isMobile = useMediaQuery('(max-width:992px)');

  const { user } = useAuth();
  const [compareData, SetcompareData] = useState<IRelatedCompareProps>({
    comparedCollegeData: [],
    hasError: false
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const compareData = await getCompareHistoryListData(user.id);
        SetcompareData(compareData);
      }
    };
    fetchData();
  }, [user?.id]);

  const handleRemove = async (historyId: number, type: string) => {
    const stream =
      streamCode[type].includes(Stream.ENGINEERING) || streamCode[type].includes(SubStream.ARCHITECTURE)
        ? Stream.ENGINEERING
        : Stream.MEDICAL;
    await removeCompare(historyId, stream);
    const fetchData = async () => {
      if (user?.id) {
        const compareData = await getCompareHistoryListData(user.id);
        SetcompareData(compareData);
      }
    };
    fetchData();
  };

  return (
    <>
      {compareData.hasError ? (
        <ErrorComponent />
      ) : compareData.comparedCollegeData.length > 0 ? (
        <Box data-test-id="compare-history-related-compared">
          <Typography className="dashBoard_h6">{ComparedHistoryTitles.COMPARE_HISTORY}</Typography>
          {compareData.comparedCollegeData.map((comparedColleges, index) => (
            <Box
              key={index}
              className={styles.comparedCard}
              data-test-id={`related-compared-comparedColleges-${index}`}
            >
              <Box className={styles.collegeMainCard}>
                {comparedColleges.history.map((college: ICollegedata) => (
                  <Box key={college.collegeId} className={styles.collegeMainCardCols}>
                    <Box
                      className={styles.collegeSubCard}
                      data-test-id={`related-compared-college-${college.collegeId}`}
                    >
                      <Box className={styles.clgImg}>
                        <Image
                          src={`/assets/images/cs/${college.collegelogo ? college.collegelogo : 'campus.webp'}`}
                          alt="collegelogo"
                          width={50}
                          height={50}
                        />
                      </Box>
                      <Typography className={styles.collegeName}>{college.shortName}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box className={styles.iconsCard}>
                <Button
                  className={styles.removeButton}
                  onClick={() => handleRemove(comparedColleges.id, comparedColleges.history[0].type)}
                >
                  <Image
                    src="/assets/images/compare-history-icons/remove.svg"
                    alt="remove_icon"
                    width={14.6}
                    height={18.1}
                  />
                  <Typography className={styles.removeText}>{ComparedHistoryTitles.REMOVE}</Typography>
                </Button>

                <Divider orientation="vertical" flexItem />

                <Link
                  href={`${
                    streamCode[comparedColleges.history[0].type].includes(Stream.ENGINEERING.toLowerCase()) ||
                    streamCode[comparedColleges.history[0].type].includes(SubStream.ARCHITECTURE.toLowerCase())
                      ? ENGINEERING_BASE_URL
                      : MEDICAL_BASE_URL
                  }/colleges-comparison/${comparedColleges.history[0].shortUrl}/${comparedColleges.history[1]
                    ?.shortUrl}/${
                    !isMobile && comparedColleges.history?.[2]?.shortUrl ? comparedColleges.history?.[2]?.shortUrl : ''
                  }`}
                  className={styles.comparedButton}
                >
                  <Image
                    src="/assets/images/compare-history-icons/compare.svg"
                    alt="compare_icon"
                    width={24}
                    height={18}
                  />
                  <Typography className={styles.comparedText}>{ComparedHistoryTitles.COMPARE}</Typography>
                </Link>
                {!isMobile && (
                  <>
                    <Divider orientation="vertical" flexItem />
                    <Box className={styles.typeWrapper}>
                      <Typography className={styles.collegeType}>
                        {capitalize(streamCode[comparedColleges.history?.[0]?.type])}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              {isMobile && (
                <>
                  <Divider orientation="vertical" flexItem />
                  <Box className={styles.typeWrapper}>
                    <Typography className={styles.collegeType}>
                      {capitalize(streamCode[comparedColleges.history?.[0]?.type])}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <Typography textAlign="center" fontSize="23px" fontWeight="600">
            {ComparedHistoryTitles.NOHISTORY}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default RelatedComparedCollege;
