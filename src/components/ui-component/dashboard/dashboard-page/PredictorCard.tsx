import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from './predictorList.module.css';

import useAuth from 'hooks/useAuth';
interface IPredictorTypeProps {
  type: string;
  link: string;
}
interface IPredictorDataProps {
  id: number;
  title: string;
  type: string;
  image: string;
  tool: string;
  PredictorType: IPredictorTypeProps[];
}
interface IDashboardDataProps {
  predictor: IPredictorDataProps;
}

const PredictorCard: React.FC<IDashboardDataProps> = ({ predictor }) => {
  const { user } = useAuth();
  const disableBox = user?.stream?.split(',').includes(predictor.type);
  return (
    <Box
      className="dashBoardStyles"
      sx={{
        filter: disableBox ? 'blur(0px)' : 'blur(5px)',
        pointerEvents: disableBox ? '' : 'none'
      }}
    >
      <Box className={styles.cardWrapper}>
        <Box className={styles.headingWrapper}>
          <Typography className="dashBoard_h6" data-test-id={`predictor-title-${predictor.id}`}>
            {predictor.title}
          </Typography>
        </Box>
        <Box className={styles.cardItemWrapper}>
          {predictor &&
            predictor.PredictorType.map((dashBoardData, index) => (
              <Box key={index}>
                <Box className={styles.carditem}>
                  <Box className={styles.logoWrapper}>
                    <Image
                      src={`/assets/images/predictors-list/${predictor.image}`}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.logoImg}
                      data-test-id={`predictor-image-${index}`}
                    />
                  </Box>
                  <Box
                    className={styles.itemWrapper}
                    borderBottom={
                      index != predictor.PredictorType.length - 1 ? '0.5px solid rgba(60, 60, 67, 0.2)' : 'none'
                    }
                  >
                    <Box>
                      <Link
                        href={dashBoardData.link}
                        className={`freeToolCard_ListTitleSub ${styles.itemValue}`}
                        data-test-id={`predictor-title-link-${index}`}
                      >
                        {dashBoardData.type}
                      </Link>
                      <Typography className={styles.itemKey}>{predictor.tool}</Typography>
                    </Box>
                    <Link href={dashBoardData.link} data-test-id={`predictor-arrow-link-${index}`}>
                      <ChevronRightIcon className={styles.linkIcon} />
                    </Link>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PredictorCard;
