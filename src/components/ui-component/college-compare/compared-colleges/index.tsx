import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { RelatedCollegesTitles } from './constant';
import styles from './ComparedColleges.module.css';

import { IErrorProps, Stream } from 'types';
import ErrorComponent from 'ui-component/error';
import { ENGINEERING_BASE_URL, MEDICAL_BASE_URL } from 'config';

interface IRelatedCollegesProps {
  collegeId: number;
  collegeName: string;
  collegelogo: string;
  shortUrl: string;
  stream: string;
}
export interface IRelatedComparedprops extends IErrorProps {
  relatedComparedData: IRelatedCollegesProps[][];
}

const RelatedColleges: React.FC<IRelatedComparedprops> = ({ relatedComparedData, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box data-test-id="compare-compared-college-relatedcollege">
          <Typography className="dashBoard_h4">{RelatedCollegesTitles.RELATED_COMPARED_COLLEGES}</Typography>
          {relatedComparedData.map((comparedColleges, index) => {
            if (comparedColleges.length >= (isMdDown ? 2 : 3))
              return (
                <Box
                  key={index}
                  className={styles.comparedCollegeCard}
                  data-test-id={`relatedcollege-comparedColleges-${index}`}
                  component="a"
                  href={`${
                    comparedColleges[0].stream === Stream.ENGINEERING ? ENGINEERING_BASE_URL : MEDICAL_BASE_URL
                  }/colleges-comparison/${comparedColleges[0].shortUrl}/${comparedColleges[1].shortUrl}/${
                    comparedColleges[2].shortUrl || ''
                  }`}
                >
                  {comparedColleges.slice(0, isMdDown ? 2 : 3).map((college: IRelatedCollegesProps) => {
                    return (
                      <Box
                        key={college.collegeId}
                        className={styles.collegeSubCard}
                        data-test-id={`relatedcollege-college-${college.collegeId}`}
                      >
                        <Box className={styles.imgBg}>
                          <Image
                            src={`/assets/images/cs/${college.collegelogo}`}
                            alt="collegelogo"
                            width={50}
                            height={50}
                            className={styles.nextImg}
                          />
                        </Box>
                        <Typography className={styles.comparedCollegeName}>{college.collegeName}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              );
          })}
        </Box>
      )}
    </>
  );
};

export default RelatedColleges;
