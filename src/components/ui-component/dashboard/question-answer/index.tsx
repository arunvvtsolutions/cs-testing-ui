'use client';
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { Box } from '@mui/system';
import { AccordionSummary, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

import { QuestionAnswerTitle } from './constant';

import styles from 'ui-component/college-overview-page/students-reviews/studentReviewStyles.module.css';
import { IErrorProps } from 'types';
import { convertISOToCustomFormat } from 'utils';
import ErrorComponent from 'ui-component/error';
import useAuth from 'hooks/useAuth';
import { getStudentQuesAndAns } from 'utils/api/student-dashboard';

interface UserQuestionAns {
  userId: number;
  userName: string;
  questionId: number;
  collegeId: number;
  shortName: string;
  postByDesc: string;
  replayByUser: string;
  replayByDesc: string;
  addedDate: string;
  status: number;
  stream: string;
}

export interface IQuestionAnsDataProps extends IErrorProps {
  userQuestionAnswer: UserQuestionAns[];
}

const QuestionAnsComponent = () => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const [activePage, setActivePage] = useState<string>('');
  const [questionAnsData, setQuestionAnsData] = useState<IQuestionAnsDataProps>({
    userQuestionAnswer: [],
    hasError: false
  });
  const asPath = usePathname();
  const [segments] = useState(asPath?.split('/'));
  const { user } = useAuth();
  useEffect(() => {
    const activePageName = segments?.[segments.length - 1];
    activePageName && setActivePage(activePageName);
  }, [segments]);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const getData = async () => {
      if (user?.id) {
        const review = await getStudentQuesAndAns(user.id);
        setQuestionAnsData(review);
      }
    };
    getData();
  }, [user?.id]);
  return (
    <Box>
      <Box className="emptyCard">
        {questionAnsData.hasError == true ? (
          <ErrorComponent />
        ) : questionAnsData.userQuestionAnswer?.length > 0 ? (
          <Box data-test-id={`${activePage}-user-question-answers`} className={styles.reviewsSection}>
            <Box className="cardHead" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography className={`cg_InnerTitleTxt ${styles.dashboardHeading}`}>
                {QuestionAnswerTitle.SUBHEAD_TITLE}
              </Typography>
            </Box>

            <Box className="ReviewSecBody">
              {questionAnsData.userQuestionAnswer.map((data, index) => (
                <Box
                  key={index}
                  className={styles.dashboardAccordianWarp}
                  data-test-id={`${activePage}-user-question-answersec-${index}`}
                >
                  <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                    <AccordionSummary
                      expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}
                      sx={{
                        background: '#fff',
                        borderBottom: expanded === index ? '0.5px solid rgba(60, 60, 67, 0.15)' : 'none'
                      }}
                      aria-controls={`${data.userId}-content`}
                      id={`${data.userId}-header`}
                    >
                      <Box className={styles.accordionInnerHead}>
                        <Box className={styles.userImgBx}>
                          <Image
                            className={styles.userImage}
                            src="/assets/images/user.png"
                            width={60}
                            height={60}
                            alt="verify"
                          />
                        </Box>
                        <Box>
                          <Typography className={styles.reviewUserName}>{data.userName}</Typography>
                          <Typography className={styles.postDate}>{`Posted On ${convertISOToCustomFormat(
                            data.addedDate
                          )}`}</Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Box className={styles.clgBx}>
                          <Typography
                            color="#1452A4"
                            fontWeight="500"
                            data-test-id={`infra-structure-review-for-${user?.id}`}
                            pb={1}
                          >
                            {data.shortName}
                          </Typography>
                        </Box>
                        <Box className={styles.inerBx}>
                          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Box className={styles.noneSelection}></Box>
                          </Box>
                          <Box className={styles.postByBox}>
                            {QuestionAnswerTitle.POST_BY}
                            {data.userName}
                          </Box>
                          <Typography className={styles.postReplayText}>{data.postByDesc}</Typography>
                        </Box>

                        <Box className={styles.dashboardinerBx}>
                          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Box className={styles.noneSelection}></Box>
                          </Box>
                          <Box className={styles.postByBox}>
                            {QuestionAnswerTitle.REPLAY_BY}
                            {data.replayByUser}
                          </Box>
                          <Typography className={styles.postReplayText}>{data.replayByDesc}</Typography>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="400px">
            <Typography textAlign="center" fontSize="23px" fontWeight="600">
              {QuestionAnswerTitle.NO_QUESTIONS_FOUND}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QuestionAnsComponent;
