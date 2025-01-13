import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import styles from './cutoffResults.module.css';
import { CutoffResultsContent } from './constant';

import { ICutoffResultsProps } from './index';

const CutoffResultTable: React.FC<ICutoffResultsProps> = ({ cutoffResultsData }) => {
  return (
    <Box data-test-id="cutoff-results">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ border: '1px solid #DFE1E6' }}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className={styles.heading} align="center">
                  {CutoffResultsContent.ROUND}
                </TableCell>
                <TableCell className={styles.heading}>{CutoffResultsContent.COURSE}</TableCell>
                <TableCell className={styles.heading} colSpan={3}>
                  {CutoffResultsContent.CLOSING_RANK}
                </TableCell>
              </TableRow>
              <TableRow className={styles.tableWrapper}>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {cutoffResultsData && cutoffResultsData?.years?.length > 0 ? (
                  cutoffResultsData.years?.sort().map((yearsData, index) => (
                    <TableCell className={styles.resultCell} key={index} data-test-id={`result-yearsData-${index}`}>
                      {yearsData}
                    </TableCell>
                  ))
                ) : (
                  <TableCell className={styles.resultCell} colSpan={4}>
                    {CutoffResultsContent.NO_DATA_FOUND}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {cutoffResultsData &&
                cutoffResultsData.results &&
                cutoffResultsData.results.map((rData) => (
                  <TableRow key={rData.id} data-test-id={`result-rData-${rData.id}`}>
                    <TableCell className={styles.resultCell} align="center">
                      {rData.round}
                    </TableCell>
                    <TableCell className={styles.resultCell}>{rData.course}</TableCell>
                    {cutoffResultsData.years &&
                      cutoffResultsData.years.map((yearData, index) => (
                        <TableCell
                          className={styles.closingRankResult}
                          key={index}
                          data-test-id={`result-yearData-${index}`}
                        >
                          {rData.closingRank.find((data) => data.year === yearData)?.rank || '-'}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default CutoffResultTable;
