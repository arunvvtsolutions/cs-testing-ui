/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './QuestionReplay.module.css';
import { ReplayTitles } from './constant';

import faqClasses from 'ui-component/college-overview-page/overview-faq/Faq.module.css';
import classes from 'ui-component/college-overview-page/students-reviews/studentReviewStyles.module.css';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import { convertISOToCustomFormat } from 'utils';
import { getQuestionReplay } from 'utils/api/course-fees-inner-page/question-answer';
import { getReplayData } from 'utils/api/questions';
import useAuth from 'hooks/useAuth';
import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export interface IProfileProps {
  userId: number;
  userName: string;
  reviewId: number;
  collegeId: number;
  addedDate: string;
  profile: string;
}

export type IReplayerProps = {
  id: number;
  replayerName: string;
  cs_course_answer?: string;
  replayerComment?: string;
};

export interface IReplayprops {
  userId: string | undefined;
  userName: string;
  question: string;
  replay: IReplayerProps[];
}

export interface IpostQuestion {
  question: string;
  collegeUrl: string;
  studentId: number;
}
export interface IPostReplayQuestion {
  questionId: number;
  studentId: number;
  collegeUrl: string;
  answer: string;
}

export interface IQuestionDataProps {
  question: string;
  collegeUrl?: string | string[];
  studentId: string | undefined;
  courseName?: string | string[];
}

export interface IReplayStateProps {
  questionId: number;
  collegeUrl?: string | string[];
  studentId: string | undefined;
  answer: string;
  courseName?: string | string[];
}
export interface IProfileDataProps {
  stream: string;
  profileData: IProfileProps[];
}

export interface IQuestionProps extends IErrorProps {
  profileData: IProfileDataProps;
  postQuestionAnswer: (data: any) => Promise<IReplayprops[] | undefined>;
  postQuestions: (data: any) => Promise<IProfileDataProps | undefined>;
  data: IQuestionDataProps;
  setNewQuestion: (data: string) => void;
  newQuestion: string;
  setNewReply: (data: string) => void;
  newReply: string;
  replayState: IReplayStateProps;
  setQuestionId: (data: number) => void;
}

const QuestionReplayAccordion: React.FC<IQuestionProps> = ({
  profileData,
  hasError,
  postQuestionAnswer,
  data,
  postQuestions,
  newQuestion,
  setNewQuestion,
  newReply,
  setNewReply,
  replayState,
  setQuestionId
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const [questions, setQuestions] = useState<IProfileProps[]>(profileData?.profileData);
  const [replayDatas, setReplayDatas] = useState<IReplayprops[]>([]);
  const handleChange =
    (panel: number, questionId: number) => async (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      setQuestionId(questionId);
      if (data.courseName) {
        const replayData = await getQuestionReplay(questionId, profileData?.stream);
        setReplayDatas(replayData);
      } else {
        const replayData = await getReplayData(questionId, data.collegeUrl, profileData?.stream);
        setReplayDatas(replayData);
      }
    };

  const handleQuestionFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewQuestion('');
    if (user?.id) {
      const questions = await postQuestions({
        ...data,
        stream: profileData?.stream
      });

      questions?.profileData && setQuestions(questions?.profileData);
    } else {
      router.push('/sign-in');
    }
  };

  const handleReplyFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewReply('');
    if (user?.id) {
      const replay = await postQuestionAnswer({
        ...replayState,
        stream: profileData?.stream
      });

      if (replay) {
        setReplayDatas(replay);
      }
    } else {
      router.push('/sign-in');
    }
  };

  useEffect(() => {
    setQuestions(profileData?.profileData);
  }, [profileData]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box data-test-id="question-question-accordion">
          <Box className="cg_InnerTitleTxt">{ReplayTitles.ASK_YOUR_QUESTION}</Box>
          <Box className={styles.topPostBlock}>
            <form onSubmit={handleQuestionFormSubmit}>
              <Box className={styles.askQuestionCard}>
                {/*POSTING_QUESTION_HERE */}
                <textarea
                  placeholder="Question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className={styles.inputChanges}
                />
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.askQuestionButton}
                  disabled={!newQuestion.trim()}
                >
                  {ReplayTitles.POST}
                </Button>
              </Box>
            </form>
          </Box>

          {/* GENERATE ACCORDIONS DYNAMICALLY BASED ON THE POSTS ARRAY */}
          {questions?.length > 0 &&
            questions.map((profile, postIndex) => (
              <Box key={postIndex} className={styles.dynamicCard} data-test-id={`questions-${postIndex}`}>
                <Accordion
                  expanded={expanded === postIndex}
                  onChange={handleChange(postIndex, profile.reviewId)}
                  className={`${faqClasses.mainFaq} ${styles.mainFaq2}  `}
                >
                  <AccordionSummary
                    key={postIndex} // Add a unique key here
                    sx={{
                      background: expanded === postIndex ? '#DFE1E633' : '#fff'
                    }}
                    expandIcon={expanded === postIndex ? <RemoveIcon /> : <AddIcon />}
                    aria-controls={`panel${postIndex}bh-content`}
                    id={`panel${postIndex}bh-header`}
                  >
                    <Box className={classes.accordionInnerHead}>
                      <Box className={classes.userImgBx}>
                        <Image
                          className={classes.userImage}
                          src={
                            profile.profile
                              ? `${API_BASE_URL}/${Api.profileImage}/${profile.profile}`
                              : '/assets/images/user.png'
                          }
                          width={60}
                          height={60}
                          alt=""
                        />
                      </Box>
                      <Box>
                        <Typography variant="h2" component="h2" className={classes.reviewUserName}>
                          {profile.userName !== null ? profile.userName : ReplayTitles.ANONYMOUS}
                        </Typography>
                        <Box>
                          {ReplayTitles.POST_ON} {convertISOToCustomFormat(profile.addedDate)}
                        </Box>
                      </Box>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails>
                    {replayDatas && replayDatas.length > 0 ? (
                      <>
                        {replayDatas.map((replay, index) => (
                          <Box key={index} data-test-id={`replay-${index}`}>
                            {/* DISPLAY THE QUESTION */}
                            <Box className={styles.topHeadBlock}>
                              <Typography variant="h2" component="h2" className={styles.postAndReplayTitles}>
                                {ReplayTitles.POST_BY} {replay.userName}
                              </Typography>
                              <Typography variant="h2" component="h2" className={styles.postAndReplayDiscription}>
                                {replay.question}
                              </Typography>
                            </Box>
                            {/* INPUT FOR REPLYING TO A QUESTION */}
                            <form onSubmit={handleReplyFormSubmit}>
                              <Box className={`${styles.askQuestionCard} ${styles.light}`}>
                                <textarea
                                  placeholder="Reply"
                                  value={newReply}
                                  onChange={(e) => setNewReply(e.target.value)}
                                  className={styles.inputChanges}
                                />
                                <Button
                                  variant="contained"
                                  type="submit"
                                  disabled={!newReply.trim()}
                                  className={`${styles.replayBtn}`}
                                >
                                  {ReplayTitles.POST}
                                </Button>
                              </Box>
                            </form>
                            {/* LIST OF REPLIES TO THIS QUESTION */}
                            <Box>
                              <List className={styles.replayContentUl}>
                                <Box>
                                  {replay.replay &&
                                    replay.replay.map((replayer) => {
                                      return (
                                        <ListItem
                                          key={replayer.id}
                                          className={styles.replayContent}
                                          data-test-id={`replayer-${replayer.id}`}
                                        >
                                          <Typography
                                            variant="h2"
                                            component="h2"
                                            className={styles.postAndReplayTitles}
                                          >
                                            {ReplayTitles.REPLIED_BY}
                                            {replayer.replayerName}
                                          </Typography>
                                          <Typography
                                            variant="h2"
                                            component="h2"
                                            className={styles.postAndReplayDiscription}
                                          >
                                            {replayer.cs_course_answer
                                              ? replayer.cs_course_answer
                                              : replayer.replayerComment}
                                          </Typography>
                                        </ListItem>
                                      );
                                    })}
                                </Box>
                              </List>
                            </Box>
                          </Box>
                        ))}
                      </>
                    ) : (
                      <div>{ReplayTitles.NO_REPLAY_COMMENT} </div>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
        </Box>
      )}
    </>
  );
};

export default QuestionReplayAccordion;
