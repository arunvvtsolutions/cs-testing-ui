/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Avatar, Box, Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowDownward, Code, Edit, EditRounded } from '@mui/icons-material';
// import Visualization from '../visualization/Visualization';
import Link from 'next/link';

import styles from './style.module.css';
import ChatContent from './chat-content';
import CustomeTextarea from './chat-textField/textArea';
import { CHATBOT_CONSTANTS } from './constant';
import ChatTextField from './chat-textField';
import ChatSuggestions from './chat-suggestion';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { getNewChat, updateChat } from 'utils/api/chat-bot';
import { getTokenDetailsSuccess, openPaymentModal, updateChatHistory } from 'store/slices/chat-bot';
import { getAgentDetails } from 'utils/api/chatbot-agent';
interface IChartTypeProps {
  categorical_data: { name: string; data: string[] }[];
  numerical_data: { name: string; data: number[] }[];
}

export interface IChatBotProps {
  id: number;
  question: string;
  questionId?: string;
  answer: string;
  stTime?: Date;
  etTime?: Date;
  visualization?: IChartTypeProps;
  visualization_descriptions?: string[];
  chat_title?: string | null;
  loading?: boolean;
}

export interface IAgentDetails {
  id: number;
  name: string;
  shortName: string;
  shortUrl: string;
  endPoint: string;
  quotaType: string;
}

const ChatbotWindow = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLgDown = useMediaQuery('(max-width:1400px)');
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { tokenDetails, chatHistory } = useSelector((state) => state.chatBot);

  const { visualizationDrawer } = useSelector((state) => state.menu);
  const router = useRouter();
  const params = useParams();

  const [openVisualization, setVisualization] = useState<boolean>(false);
  const [selectedQuestion, setEditQuestion] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [buttonDisable] = useState(false);
  const [, setHeights] = useState<string[]>([]);
  const [chatBotAgentDetails, setAgentDetails] = useState<IAgentDetails | null>();

  const targetRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>();
  const heightsRef = useRef<HTMLDivElement[]>([]);

  const handleEdit = (chatId: string, selectedQst: string) => {
    setEditQuestion(chatId);
    setQuestion(selectedQst);
  };

  const scrollToDown = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  const handleAddNewQuestion = async (content?: string) => {
    const setQuestionCopy = content || newQuestion;
    setNewQuestion('');
    const newChatHistory = [...chatHistory];
    newChatHistory.push({
      id: 0,
      question: setQuestionCopy,
      answer: '',
      stTime: new Date(),
      loading: true
    });

    dispatch(updateChatHistory([...newChatHistory]));
    try {
      const chat = await getNewChat(
        params?.threadId?.[0] || '',
        setQuestionCopy,
        chatBotAgentDetails?.shortUrl || CHATBOT_CONSTANTS.AIQ,
        user?.chatbotAgent || 0
      );

      if (chat && !chat.status && !chat.payment) dispatch(openPaymentModal(true));
      else {
        const categoricalData = chat?.prompt?.Visualization?.categorical_data?.map((ctgryDta: any) => ({
          data: ctgryDta.data
        }));
        newChatHistory[newChatHistory.length - 1] = {
          ...newChatHistory[newChatHistory.length - 1],
          answer: chat?.prompt?.description || '',
          questionId: chat.questionId,
          visualization: {
            categorical_data: categoricalData,
            numerical_data: chat?.prompt?.Visualization?.numerical_data?.map((numData: any) => ({
              name: numData.Column_name,
              data: numData.data
            }))
          },
          visualization_descriptions: chat?.prompt?.Visualization_descriptions,
          chat_title: chat?.prompt?.Chat_title,
          etTime: chat.responseTime,
          loading: false
        };
        if (!params?.threadId?.[0]) {
          router.push(`/chat-bot/${chat?.thread_id}`);
        }
        dispatch(
          getTokenDetailsSuccess({
            ...tokenDetails,
            tokenCount: (tokenDetails?.tokenCount || 0) - 1
          })
        );
        dispatch(updateChatHistory([...newChatHistory]));
      }
      scrollToDown();
    } catch (error) {
      newChatHistory[newChatHistory.length - 1] = {
        ...newChatHistory[newChatHistory.length - 1],
        answer: CHATBOT_CONSTANTS.ERROR_MESSAGE,
        questionId: '',
        loading: false
      };
      dispatch(updateChatHistory([...newChatHistory]));
    }
  };

  const updateQuestion = async (index: number, questionId: string, time?: Date, qst?: string) => {
    const newChat = [...chatHistory];
    try {
      newChat[index] = {
        ...newChat[index],
        question: qst || '',
        answer: '',
        loading: true
      };
      dispatch(updateChatHistory([...newChat]));
      const result = await updateChat(
        params?.threadId?.[0] || '',
        questionId,
        chatBotAgentDetails?.name || CHATBOT_CONSTANTS.AIQ,
        chatBotAgentDetails?.id || 0,
        {
          query: qst || question,
          requestTime: time || new Date()
        }
      );

      if (result && result.data && !result.data.status && !result.data.payment) {
        // dispatch(openSnackbar(ErrorSnackbar(result.data.message)));
        dispatch(openPaymentModal(true));
      } else if (result && result.data.prompt) {
        const categoricalData = result.data.prompt?.Visualization?.categorical_data?.map((ctgryDta: any) => ({
          data: ctgryDta.data
        }));
        newChat[index] = {
          ...newChat[index],
          question: result.data.prompt.Question,
          answer: result.data.prompt.description,
          loading: false,
          visualization: {
            categorical_data: categoricalData,
            numerical_data: result.data.prompt?.Visualization?.numerical_data?.map((numData: any) => ({
              name: numData.Column_name,
              data: numData.data
            }))
          },
          visualization_descriptions: result.data.prompt?.Visualization_descriptions
        };
        dispatch(updateChatHistory([...newChat]));
        dispatch(
          getTokenDetailsSuccess({
            ...tokenDetails,
            tokenCount: (tokenDetails?.tokenCount || 0) - 1
          })
        );
        setEditQuestion('');
      }
    } catch (error) {
      newChat[index] = {
        ...newChat[index],
        question: qst || '',
        answer: CHATBOT_CONSTANTS.ERROR_MESSAGE,
        loading: false
      };
      dispatch(updateChatHistory([...newChat]));
    }
  };

  const handleOpenVisualization = () => {
    setVisualization(!openVisualization);
  };

  useEffect(() => {
    scrollToDown();
  }, [chatHistory.length]);

  const sidebarSx = {
    backgroundColor: '#FFF',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    // display: (openVisualization && !isLgDown) || (visualizationDrawer && isLgDown) ? ' !important' : 'none !important',
    display: 'none !important',
    transition: '.3s',
    maxWidth: !isLgDown ? '33.333%' : '100% !important',
    width: '100%'
  };

  // this is for getting the height of the chat for assigning the height of visualization
  useEffect(() => {
    const newHeights = chatHistory.map((_, index) => {
      const element = heightsRef.current[index];
      return element ? `${element.clientHeight}px` : '100%';
    });
    setHeights(newHeights);
  }, [chatHistory]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.chatbotAgent) {
        const agentData = await getAgentDetails(user.chatbotAgent);
        setAgentDetails(agentData);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Stack direction="column" spacing={2} height="100%" className={styles.chatBody}>
      {!openVisualization && (
        <Box className={styles.visualizationDrawerBtn}>
          <Typography>{CHATBOT_CONSTANTS.VISUALIZATION}</Typography>
          <IconButton className={styles.visualizationDrawericonBtn} onClick={handleOpenVisualization}>
            <Code />
          </IconButton>
        </Box>
      )}
      <Box
        ref={targetRef}
        sx={{
          marginTop: '0px !important',
          display: 'flex',
          justifyContent: openVisualization ? 'space-between' : 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Box
          // maxWidth={!isLgDown ? (openVisualization ? '66.67%' : '100%') : visualizationDrawer ? '0' : '100%'}
          maxWidth="100%"
          display={visualizationDrawer && isLgDown ? 'none !important' : 'flex'}
          flexDirection="column"
          sx={{ justifyContent: 'space-between' }}
          width="100%"
          paddingX="10px"
        >
          <Box display="flex" justifyContent="center" flexDirection="column" className={styles.chatWrapper}>
            <Box
              sx={{ padding: '40px 27px 20px', width: '100%' }}
              className={`${!isLgDown && styles.chatWindowHeader}`}
            >
              <Typography className={styles.chatHeaderText}>
                {CHATBOT_CONSTANTS.CHAT_HEADER_TITLE} - {chatBotAgentDetails?.name || '-'}
              </Typography>
              {!isLgDown && (
                <Button
                  startIcon={<Edit />}
                  className={styles.agentButton}
                  onClick={() => router.push('/agent-dashboard')}
                >
                  {CHATBOT_CONSTANTS.EDIT_YOUR_AGENT}
                </Button>
              )}
            </Box>
            <Box
              // maxWidth={!openVisualization ? '70%' : isLgDown ? '100%' : '95%'}
              maxWidth={isMdDown ? '100%' : '843px'}
              width="100%"
              alignSelf="center"
            >
              {chatHistory.length > 0 ? (
                chatHistory.map((chat, index) => {
                  return (
                    <Box
                      key={index}
                      ref={(el) => (heightsRef.current[index] = el as HTMLDivElement)}
                      data-test-id={`chatbot-box-${index}`}
                      className={styles.chatbox}
                      sx={{
                        justifyContent: !openVisualization ? 'center' : 'space-between'
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        width="100%"
                        sx={{
                          transition: '.1s',
                          paddingX: isMdDown ? '10px' : 0
                          // openVisualization && !isLgDown ? '50px' : isLgDown && visualizationDrawer ? '10px' : '0px'
                        }}
                      >
                        <Box className={styles.questionBox}>
                          <Box
                            className={styles.AvatarBox}
                            alignItems={selectedQuestion === chat.questionId ? 'start !important' : 'center !important'}
                          >
                            <Avatar
                              data-test-id={`chatbot-box-userimage-${index}`}
                              sx={{ bgcolor: 'rgb(144 202 249 / 35%)' }}
                              src={`${API_BASE_URL}/${Api.profileImage}/${user?.image}`}
                            />
                            {selectedQuestion === chat.questionId ? (
                              <Box className={styles.editTxtBox}>
                                <CustomeTextarea
                                  value={question}
                                  setValue={setQuestion}
                                  data-test-id={`chatbot-box-edit-textarea-${index}`}
                                />
                              </Box>
                            ) : (
                              <Box
                                display={{
                                  sm: 'block',
                                  xs: 'block',
                                  md: 'flex',
                                  lg: 'flex'
                                }}
                                justifyContent="space-between"
                                alignItems="center"
                                width="100%"
                                pr={2}
                              >
                                <Box>
                                  <Typography
                                    className={styles.question}
                                    data-test-id={`chatbot-box-question-${index}`}
                                  >
                                    {chat.question}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    className={styles.questionTime}
                                    sx={{ fontSize: '14px !important' }}
                                    data-test-id={`chatbot-box-question-${index}`}
                                    noWrap
                                  >
                                    {new Date(chat.stTime || '')?.toLocaleTimeString()}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Box>
                          {chat.questionId && (
                            <Box>
                              <IconButton
                                className={styles.editButton}
                                onClick={() => handleEdit(chat.questionId || '', chat.question)}
                                data-test-id={`chatbot-box-edit-btn-${index}`}
                              >
                                <EditRounded sx={{ color: '#161618 !important' }} />
                              </IconButton>
                            </Box>
                          )}
                        </Box>
                        {selectedQuestion === chat.questionId && (
                          <Box className={styles.updateBox}>
                            <Button
                              data-test-id={`chatbot-box-cancel-btn-${index}`}
                              className={styles.updateButton}
                              onClick={() => setEditQuestion('')}
                              sx={{
                                backgroundColor: 'rgba(20, 135, 104, 0.05)',
                                color: '#148768',
                                '&.hover': {
                                  backgroundColor: 'rgba(20, 135, 104, 0.05) !important'
                                }
                              }}
                            >
                              {CHATBOT_CONSTANTS.CANCEL}
                            </Button>
                            <Button
                              data-test-id={`chatbot-box-update-btn-${index}`}
                              className={styles.updateButton}
                              onClick={() => updateQuestion(index, chat.questionId || '', chat.etTime || new Date())}
                              disabled={!question.trim()}
                              sx={{
                                backgroundColor: '#148768 !important',
                                ml: 2,
                                color: '#FFF',
                                '&.hover': {
                                  backgroundColor: '#148768 !important'
                                }
                              }}
                            >
                              {CHATBOT_CONSTANTS.UPDATE}
                            </Button>
                          </Box>
                        )}
                        <Box padding={'20px 0'} mt={3} ref={chatBoxRef}>
                          <ChatContent
                            answer={chat.answer}
                            etTime={chat.etTime}
                            data-test-id={`chatbot-box-content-${index}`}
                            index={index}
                            questionId={chat.questionId}
                            requestTime={chat.etTime}
                            question={chat.question}
                            updateQuestion={updateQuestion}
                          />
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Box className={styles.initialDescWrapper}>
                  <Avatar
                    className={styles.csLogo}
                    src="/assets/images/logomini2.webp"
                    data-test-id={`chatbot-box-college-logo`}
                  />
                  <Typography className={styles.initialDesc}>{CHATBOT_CONSTANTS.OPEN_MESSAGE}</Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box position="sticky" bottom={0} display="flex" justifyContent="center" flexDirection="column">
            {chatHistory.length > 1 && (
              <Box
                className={styles.downIcon}
                sx={{
                  // marginRight: openVisualization ? '15px  !important' : '30px !important'
                  marginRight: isMdDown ? '0px !important' : '30px !important '
                }}
              >
                <IconButton
                  disabled={buttonDisable}
                  data-test-id={`chatbot-box-scroll-down-btn`}
                  onClick={scrollToDown}
                  sx={
                    buttonDisable && !isMdDown
                      ? {
                          borderColor: 'gray !important'
                        }
                      : {}
                  }
                >
                  <ArrowDownward />
                </IconButton>
              </Box>
            )}
            <Box
              className={styles.textFieldDiv}
              sx={{
                // paddingX: openVisualization && !isLgDown ? '50px' : isLgDown && visualizationDrawer ? '10px' : '0px',
                paddingY: '10px'
              }}
              // maxWidth={!openVisualization ? '70%' : isLgDown ? '100%' : '95%'}
              maxWidth={isMdDown ? '100%' : '843px'}
            >
              {/* chat suggestions below */}
              {!chatHistory.length && <ChatSuggestions handleAddQuestion={handleAddNewQuestion} />}

              <ChatTextField
                loading={chatHistory[chatHistory.length - 1]?.loading || false}
                value={newQuestion}
                setValue={setNewQuestion}
                handleAddNewQuestion={handleAddNewQuestion}
                data-test-id={`chatbot-box-text-area`}
              />
              {isLgDown && (
                <Box width="100%" className={`${styles.linkBox}`} display="grid">
                  <Link href="/agent-dashboard" className={styles.link}>
                    {CHATBOT_CONSTANTS.CLICK_TO_CHANGE_AGENT}
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {/* visualization */}
        <Box sx={sidebarSx}>
          <Box
            className={styles.visualizationHeader}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              backgroundColor: '#FFF'
            }}
          >
            <Box position="relative" sx={{ padding: '47px 27px 4px' }}>
              {!isLgDown && (
                <IconButton className={styles.visDrawerbtn} onClick={handleOpenVisualization}>
                  <Code />
                </IconButton>
              )}
              <Typography>{CHATBOT_CONSTANTS.VISUALIZATION}</Typography>
            </Box>
          </Box>
          {/* <Box>
            {chatHistory.map((chat, index) => {
              return (
                <ScrollContent
                  key={index}
                  overflow="auto"
                  height={`${heights[index] ?? '100% '} !important`}
                  minHeight={`${heights[index] ?? '100% '} !important`}
                  mt={2}
                >
                  <Visualization visualization={chat} height={chatBoxRef.current?.clientHeight} />
                </ScrollContent>
              );
            })}
          </Box> */}
        </Box>
      </Box>
    </Stack>
  );
};

export default ChatbotWindow;
