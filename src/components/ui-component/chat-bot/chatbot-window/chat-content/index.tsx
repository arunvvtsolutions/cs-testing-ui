import { Avatar, Box, Grid, IconButton, Skeleton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { ContentCopyOutlined, Done } from '@mui/icons-material/';
import Image from 'next/image';
// import parser from 'html-react-parser';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { convert } from 'html-to-text';
import Markdown from 'react-markdown';

import styles from '../style.module.css';

const ChatContent = ({
  answer,
  etTime,
  index,
  questionId,
  requestTime,
  question,
  updateQuestion
}: {
  answer: string;
  etTime?: Date;
  index: number;
  questionId?: string;
  requestTime?: Date;
  question: string;
  updateQuestion: (index: number, questionId: string, time?: Date, question?: string) => void;
}) => {
  const [copyStatus, setCopyStatus] = useState<boolean | number>(false);

  const copyToClipboardHandler = () => {
    setCopyStatus(index);
    setTimeout(() => {
      setCopyStatus(false);
    }, 1500);
  };
  return (
    <Grid container spacing={2} className={styles.chatContentGrid}>
      <Grid item lg={1} md={2} sm={12} xs={12} sx={{ padding: '0px !important' }}>
        <Avatar
          className={`${styles.miniLogo} ${!answer && styles.loader}`}
          src="/assets/images/logomini2.webp"
          data-test-id={`chatbot-box-college-logo`}
        />
      </Grid>
      <Grid
        item
        lg={10}
        sm={12}
        xs={12}
        sx={{
          paddingTop: '0px !important',
          paddingLeft: { xs: '3px !important', sm: '0px !important' }
        }}
      >
        <Stack>
          <Box
            width="100%"
            data-test-id={`chatbot-box-answer`}
            sx={{ width: '100% !important', maxWidth: '100% !important' }}
          >
            {/* <Typography textAlign="right">{new Date(etTime || '')?.toLocaleTimeString()}</Typography> */}
            <>
              {answer ? (
                <Box>
                  <Box className={styles.answerWrapper}>
                    <Markdown>{answer}</Markdown>
                  </Box>
                </Box>
              ) : (
                <>
                  <Skeleton width="100%" height={30} />
                  <Skeleton width="70%" height={30} />
                  <Skeleton width="40%" height={30} />
                </>
              )}
            </>
          </Box>

          <Box mt={2} className={styles.iconsBox}>
            {answer && questionId ? (
              <>
                <CopyToClipboard
                  text={convert(answer, { tables: true, formatters: {} })}
                  onCopy={copyToClipboardHandler}
                  options={{ format: 'text/plain' }}
                >
                  <IconButton data-test-id={`chatbot-box-copy-btn`} title={copyStatus ? 'Copied' : 'Copy'}>
                    {copyStatus === index ? <Done /> : <ContentCopyOutlined />}
                  </IconButton>
                </CopyToClipboard>
                <IconButton
                  title="Refresh"
                  onClick={() => questionId && updateQuestion(index, questionId, requestTime, question)}
                >
                  <Image
                    src="/assets/images/icons/refresh.svg"
                    width={24}
                    height={24}
                    alt="refresh"
                    data-test-id={`chatbot-box-refresh-btn`}
                  />
                </IconButton>
              </>
            ) : (
              !answer &&
              !questionId && (
                <>
                  <Skeleton variant="circular" width={30} height={30} />
                  <Skeleton variant="circular" width={30} height={30} />
                </>
              )
            )}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ChatContent;
