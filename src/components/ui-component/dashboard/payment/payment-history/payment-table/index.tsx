'use client';
import {
  Typography,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Chip
} from '@mui/material';
import { capitalize } from 'lodash';

import styles from '../styles.module.css';
import { PAYMENT_HISTORY_CONSTANTS, TABLE_HEADER } from '../constant';

const tableHead = {
  '&  -MuiTableCell-root , -MuiTableCell-root': {
    borderBottom: 'none!important',
    background: 'none',
    whiteSpace: 'nowrap',
    backgroundColor: '#FBFBFD'
  },
  '& .MuiTableRow-root th:first-of-type': {
    borderTopLeftRadius: '16px'
  },
  '& .MuiTableRow-root th:last-child': {
    borderTopRightRadius: '16px'
  }
};

export type PaymentHistoryProps = {
  productName: string;
  amount: string;
  discount: string;
  date: string;
  status: string;
  trackingId: string;
};

type PaymentProps = {
  paymentHistory: PaymentHistoryProps[];
};

const PaymentTable = ({ paymentHistory }: PaymentProps) => {
  //   to get the color of status
  const getStatusColor = (status: string) => {
    return status.toLowerCase().includes(PAYMENT_HISTORY_CONSTANTS.SUCCESS) ||
      status.toLowerCase().includes(PAYMENT_HISTORY_CONSTANTS.INITIAL)
      ? styles.successChip
      : status.toLowerCase().includes(PAYMENT_HISTORY_CONSTANTS.PENDING)
        ? styles.pendingChip
        : styles.failedChip;
  };
  return (
    <TableContainer component={Paper} className={styles.tableContainer} sx={{ marginTop: '11px' }} elevation={0}>
      <Table size="small" stickyHeader aria-label="sticky table">
        <TableHead sx={tableHead}>
          <TableRow>
            {TABLE_HEADER.map((header, index) => {
              return (
                <TableCell className={styles.tableCellStyle} key={index}>
                  <Typography textAlign={'center'} className={styles.tableRowText}>
                    {header}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentHistory &&
            paymentHistory.map((row, index) => {
              const borderBottom =
                index === paymentHistory.length - 1 ? 'none !important' : '0.5px solid #1B1B1B26 !important';
              return (
                <TableRow sx={{ '& td': { border: 0 } }} key={index}>
                  <TableCell
                    align="center"
                    className={styles.tableCellStyle}
                    sx={{
                      borderBottom: borderBottom,
                      background: 'none !important'
                    }}
                  >
                    <Typography className={styles.tableRowText}>{row.productName ? row.productName : '-'}</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={styles.tableCellStyle}
                    sx={{
                      borderBottom: borderBottom,
                      background: 'none !important'
                    }}
                  >
                    <Typography className={styles.tableRowText}>₹ {row.amount ? row.amount : '-'}</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={styles.tableCellStyle}
                    sx={{
                      borderBottom: borderBottom,
                      background: 'none !important'
                    }}
                  >
                    <Typography className={styles.tableRowText}>₹ {row.discount ? row.discount : '-'}</Typography>
                  </TableCell>

                  <TableCell
                    align="center"
                    className={styles.tableCellStyle}
                    sx={{
                      borderBottom: borderBottom,
                      background: 'none !important'
                    }}
                  >
                    <Typography className={styles.tableRowText}>{row.trackingId || '-'}</Typography>
                  </TableCell>

                  <TableCell
                    align="center"
                    className={styles.tableCellStyle}
                    sx={{
                      borderBottom: borderBottom,
                      background: 'none !important'
                    }}
                  >
                    <Typography className={styles.tableRowText}>{new Date(row.date).toLocaleDateString()}</Typography>
                  </TableCell>

                  <TableCell
                    align="center"
                    className={styles.tableCellStyle}
                    sx={{
                      borderBottom: borderBottom,
                      background: 'none !important'
                    }}
                  >
                    <Typography className={styles.tableRowText}>
                      <Chip
                        label={capitalize(row.status)}
                        className={`${styles.tableRowText} ${getStatusColor(row.status)}`}
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
