import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';

import styles from './resultInfo.module.css';
import { ResultInfoContent } from './constant';

import MainCard from 'ui-component/MainCard';

interface IResultData {
  quota: string;
  opening: string;
  closing: string;
  gender: string;
}

interface IResultInfoProps {
  collegeName: string;
  courseName: string;
  result: IResultData[];
}

export interface IResultDataProps {
  resultInfoData: IResultInfoProps;
}
const ResultInfo: React.FC<IResultDataProps> = ({ resultInfoData }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className="emptyCard" data-test-id="future-ai-result-info">
      <Box>
        <Box className={styles.titleWrapper}>
          <Typography className="dashBoard_h3">{resultInfoData.collegeName}</Typography>
        </Box>
        <Box className={styles.courseNameWrapper}>
          <Typography className={styles.courseName}>{resultInfoData.courseName}</Typography>
        </Box>
        {isMdDown ? (
          resultInfoData.result &&
          resultInfoData.result.map((tableResult, index) => (
            <MainCard key={index}>
              <Box className={styles.itemWrapper}>
                <Typography className={`freeToolCard_ListTitleSub ${styles.resultValue}`}>
                  {tableResult.quota}
                </Typography>
                <Typography className={styles.tableHeading}>{ResultInfoContent.QUOTA}</Typography>
              </Box>
              <Box className={styles.itemWrapper}>
                <Typography className={`freeToolCard_ListTitleSub ${styles.resultValue}`}>
                  {tableResult.opening}
                </Typography>
                <Typography className={styles.tableHeading}>{ResultInfoContent.OPENING}</Typography>
              </Box>
              <Box className={styles.itemWrapper}>
                <Typography className={`freeToolCard_ListTitleSub ${styles.resultValue}`}>
                  {tableResult.closing}
                </Typography>
                <Typography className={styles.tableHeading}>{ResultInfoContent.CLOSING}</Typography>
              </Box>
              <Box className={styles.itemWrapperLast}>
                <Typography className={`freeToolCard_ListTitleSub ${styles.resultValue}`}>
                  {tableResult.gender}
                </Typography>
                <Typography className={styles.tableHeading}>{ResultInfoContent.GENDER}</Typography>
              </Box>
            </MainCard>
          ))
        ) : (
          <TableContainer component={Paper} data-test-id="future-ai-result-info-table">
            <Table aria-label="a dense table">
              <TableHead className={styles.tableHeadWrapper}>
                <TableRow>
                  <TableCell className={`freeToolCard_ListTitleSub ${styles.tableHeading}`}>
                    {ResultInfoContent.QUOTA}
                  </TableCell>
                  <TableCell className={`freeToolCard_ListTitleSub ${styles.tableHeading}`}>
                    {ResultInfoContent.OPENING}
                  </TableCell>
                  <TableCell className={`freeToolCard_ListTitleSub ${styles.tableHeading}`}>
                    {ResultInfoContent.CLOSING}
                  </TableCell>
                  <TableCell className={`freeToolCard_ListTitleSub ${styles.tableHeading}`}>
                    {ResultInfoContent.GENDER}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={styles.resultWrapper}>
                {resultInfoData.result &&
                  resultInfoData.result.map((tableResult, index) => (
                    <TableRow key={index}>
                      <TableCell className={`freeToolCard_ListTitleSub ${styles.quotaNames}`}>
                        {tableResult.quota}
                      </TableCell>
                      <TableCell className={`freeToolCard_ListTitleSub ${styles.resultValue}`}>
                        {tableResult.opening}
                      </TableCell>
                      <TableCell className={`freeToolCard_ListTitleSub ${styles.resultValue}`}>
                        {tableResult.closing}
                      </TableCell>
                      <TableCell className={`freeToolCard_ListTitleSub ${styles.resultValue}`}>
                        {tableResult.gender}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};
export default ResultInfo;
