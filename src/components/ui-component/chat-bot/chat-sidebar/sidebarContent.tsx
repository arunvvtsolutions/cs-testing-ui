import React, { memo, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useParams, useRouter } from 'next/navigation';
import { Dropdown } from '@mui/base/Dropdown';
import { styled } from '@mui/material/styles';

import { ChatSidebarTitle } from './constant';
import styles from './chatSiderBar.module.css';
// import { getChatList } from 'utils/api/chat-bot';

import useAuth from 'hooks/useAuth';
import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { getChatListData, updateChatListData } from 'utils/api/chat-bot';
import { useSelector } from 'store';
import LogoutIcon from 'ui-component/icons/LogoutIcon';
interface IChatListDataProps {
  thread_id: string;
  title: string;
  pin: string | null;
  status: string;
}

const BorderLinearProgress = styled(LinearProgress)<{ barColor?: string }>(({ theme, barColor = '#148768' }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: barColor
  }
}));

const ChatSidebarContent = ({
  selectedAgent,
  setOpen,
  handleOpenPaymentModal
}: {
  selectedAgent: number;
  setOpen: (open: boolean) => void;
  handleOpenPaymentModal: () => void;
}) => {
  const theme = useTheme();
  const { tokenDetails } = useSelector((state) => state.chatBot);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const isLgDown = useMediaQuery('(max-width:1400px)');
  const [chatList, setChatList] = useState<IChatListDataProps[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [previousName, setPreviousName] = useState<string>('');
  const [initialChatData, setInitialChatData] = useState<IChatListDataProps>({
    pin: '',
    status: '',
    thread_id: '',
    title: ''
  });
  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchor);
  const router = useRouter();
  const { user, logout } = useAuth();
  const params = useParams();

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleNewChat = () => {
    router.push(`/chat-bot`);
    if (isLgDown) {
      setOpen(false);
    }
  };

  const handleMenuDropDown = (e: React.MouseEvent<HTMLElement>, data: IChatListDataProps) => {
    setInitialChatData(data);
    e.preventDefault();
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const checkedValue = initialChatData.title.trim();

      if (checkedValue === '') {
        e.preventDefault();
      } else {
        await updateChatListData(initialChatData?.thread_id || '', {
          ...initialChatData,
          pin: initialChatData.pin || '',
          rename: initialChatData.title,
          delete: initialChatData.status
        });
      }
      setChatList([
        ...chatList?.map((chat) => {
          if (chat.thread_id === initialChatData.thread_id) {
            return {
              ...chat,
              title: initialChatData.title || previousName
            };
          } else return chat;
        })
      ]);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setMenuAnchor(null);
    setIsEditing(true);
  };

  const handleRename = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!previousName) {
      setPreviousName(initialChatData.title);
    }
    setMenuAnchor(null);
    setInitialChatData((prev) => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleDelete = async () => {
    setMenuAnchor(null);
    setInitialChatData((prev) => ({
      ...prev,
      status: '1',
      rename: initialChatData?.title || ''
    }));
    await updateChatListData(initialChatData?.thread_id || '', {
      ...initialChatData,
      pin: initialChatData.pin || '',
      rename: initialChatData.title,
      delete: '1'
    });
    if (initialChatData.thread_id == params?.threadId) {
      router.push(`/chat-bot`);
    }
    setChatList([
      ...chatList?.map((chat) => {
        if (chat.thread_id === initialChatData.thread_id) {
          return {
            ...chat,
            status: '1'
          };
        } else return chat;
      })
    ]);
  };

  const handleRemovePin = async (threadId: string, title: string) => {
    setMenuAnchor(null);
    setInitialChatData((prev) => ({
      ...prev,
      pin: '0',
      thread_id: threadId,
      title: title
    }));

    await updateChatListData(initialChatData?.thread_id || '', {
      delete: '0',
      pin: '0',
      rename: title
    });

    setChatList([
      ...chatList?.map((chat) => {
        if (chat.thread_id === initialChatData.thread_id) {
          return {
            ...chat,
            pin: '0'
          };
        } else return chat;
      })
    ]);
  };

  const handlePin = async () => {
    setMenuAnchor(null);
    setInitialChatData((prev) => ({
      ...prev,
      pin: initialChatData.pin === '0' || !initialChatData.pin ? '1' : '0',
      rename: initialChatData?.title || ''
    }));

    await updateChatListData(initialChatData?.thread_id || '', {
      ...initialChatData,
      pin: initialChatData.pin === '0' || !initialChatData.pin ? '1' : '0',
      rename: initialChatData?.title || '',
      delete: ''
    });
    setChatList([
      ...chatList?.map((chat) => {
        if (chat.thread_id === initialChatData.thread_id) {
          return {
            ...chat,
            pin: initialChatData.pin === '0' || !initialChatData.pin ? '1' : '0'
          };
        } else return chat;
      })
    ]);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAnchor(null);
  };

  const handleSelectChat = (threadId: string) => {
    router.push(`/chat-bot/${threadId}`);
    if (isLgDown) {
      setOpen(false);
    }
  };

  // this is timeout for make it to change the route, then only we can manage to redirect without params
  const handleLogout = () => {
    router.push('/chat-bot');
    setTimeout(() => {
      logout();
    }, 100);
  };

  useEffect(() => {
    const chatList = async () => {
      const result = await getChatListData(selectedAgent);
      setChatList(result?.data);
    };
    chatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.threadId, selectedAgent]);

  return (
    <>
      <Box className={styles.siderBarContent}>
        <Box className={styles.sideBarBody}>
          <Box className={styles.newChatBlock}>
            <Button className={styles.newChatBtn} onClick={handleNewChat}>
              <AddIcon />
              {ChatSidebarTitle.NEW_CHAT}
            </Button>
          </Box>
          {chatList?.some((item) => item.pin === '1' && item.status != '1') && (
            <Box className={styles.listblock}>
              <Typography variant="caption" className="listblockTitles">
                {ChatSidebarTitle.PINNED}
              </Typography>
              <List>
                {chatList &&
                  chatList?.map((data, index) => {
                    return (
                      data.pin == '1' &&
                      data.status != '1' && (
                        <ListItem key={index}>
                          <Box className={styles.linkButtons} sx={{ display: 'flex', alignItems: 'center' }}>
                            <PushPinOutlinedIcon
                              className={styles.leftIcn}
                              onClick={() => handleRemovePin(data.thread_id, data.title)}
                              sx={{ cursor: 'pointer' }}
                            />
                            <ListItemText
                              className={styles.linkButtonTxt}
                              primary={data.title}
                              onClick={() => handleSelectChat(data.thread_id)}
                              sx={{
                                cursor: 'pointer',
                                textTransform: 'capitalize'
                              }}
                            />
                          </Box>
                        </ListItem>
                      )
                    );
                  })}
              </List>
            </Box>
          )}

          {chatList && chatList.some((item) => item.status !== '1') && (
            <Box className={styles.listblock} sx={{ position: 'relative', borderBottom: 'none !important' }}>
              <Typography variant="caption">{ChatSidebarTitle.CHAT_LIST} </Typography>
              <List>
                {chatList &&
                  [...chatList].reverse().map((data, index) => {
                    return (
                      data.status !== '1' && (
                        <ListItem key={index}>
                          <Button
                            // className={` ${styles.linkButtons} ${styles.active}`}
                            className={
                              params?.threadId == data.thread_id
                                ? ` ${styles.linkButtons} ${styles.active}`
                                : styles.linkButtons
                            }
                            onClick={() =>
                              !(isEditing && initialChatData.thread_id === data.thread_id) &&
                              handleSelectChat(data.thread_id)
                            }
                            disableRipple
                          >
                            <SmsOutlinedIcon className={styles.leftIcn} />
                            {isEditing && initialChatData.thread_id === data.thread_id ? (
                              <TextField
                                value={initialChatData.title}
                                onChange={handleRename}
                                onKeyDown={handleKeyDown}
                                fullWidth
                                multiline
                                autoFocus
                                className={styles.linkButtonTxtInput}
                              />
                            ) : (
                              <ListItemText
                                // className={
                                //   params?.threadId == data.thread_id ? styles.activeLinkButtonTxt : styles.linkButtonTxt
                                // }

                                className={
                                  params?.threadId == data.thread_id
                                    ? ` ${styles.linkButtonTxt} ${styles.active}`
                                    : styles.linkButtonTxt
                                }
                                primary={data.title}
                              />
                            )}
                            {!isEditing && (
                              <IconButton
                                onClick={(e) => {
                                  handleMenuDropDown(e, data);
                                }}
                                className={styles.vertIcn}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            )}
                          </Button>
                        </ListItem>
                      )
                    );
                  })}
              </List>
              <Dropdown>
                <Menu
                  id="basic-menu"
                  anchorEl={menuAnchor}
                  open={menuOpen}
                  onClose={handleClose}
                  sx={{
                    '& .MuiPaper-root': {
                      '& .MuiMenuItem-root': {
                        fontSize: '12px'
                      },

                      '.MuiMenuItem-root:last-of-type': {
                        color: 'red',
                        '& svg': {
                          color: 'red'
                        }
                      }
                    }
                  }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <MenuItem onClick={() => handlePin()} className={styles.menuItems}>
                    <PushPinOutlinedIcon className={styles.leftIcn} />
                    {initialChatData?.pin == '0' || initialChatData?.pin === null
                      ? ChatSidebarTitle.PIN
                      : ChatSidebarTitle.UN_PIN}
                  </MenuItem>

                  <MenuItem onClick={() => handleEdit()} className={styles.menuItems}>
                    <EditOutlinedIcon className={styles.leftIcn} />
                    {ChatSidebarTitle.RENAME}
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete()} className={`${styles.menuItems}`}>
                    <DeleteOutlineOutlinedIcon className={styles.leftIcn} /> {ChatSidebarTitle.DELETE}
                  </MenuItem>
                </Menu>
              </Dropdown>
            </Box>
          )}
        </Box>
        {/* <Box className={`${styles.listblock} `} sx={{ borderBottom: 'none', padding : '24px 24px 24px' }}>
          <Typography variant="caption">{ChatSidebarTitle.MENU} </Typography>
          <List>
            <ListItem>
                <Button className={styles.linkButtons} onClick={() => window.open('/dashboard', '_blank')}>
                  <MenuIcon className={styles.leftIcn} />
                  <ListItemText className={styles.linkButtonTxt} primary={ChatSidebarTitle.DASHBOARD} />
                </Button>
              </ListItem>
              <ListItem>
                <Button className={styles.linkButtons} onClick={() => window.open('/my-account', '_blank')}>
                  <PersonIcon className={styles.leftIcn} />
                  <ListItemText className={styles.linkButtonTxt} primary={ChatSidebarTitle.MY_ACCOUNT} />
                </Button>
              </ListItem>
            <ListItem sx={{ cursor: 'pointer' }}>
              <Button className={styles.linkButtons} onClick={() => logout()}>
                <Logout className={styles.leftIcn} />
                <ListItemText className={styles.linkButtonTxt}>{ChatSidebarTitle.LOG_OUT}</ListItemText>
              </Button>
            </ListItem>
          </List>
        </Box> */}

        <Box className={styles.DropDownBlock} sx={{ width: '100% !important' }}>
          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
              width="100%"
              pb={1}
            >
              <Typography>{ChatSidebarTitle.QUESTIONS_TXT}</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row">
                <Typography fontSize="15px" fontWeight="bold" color="#1B1B1B">
                  {tokenDetails?.tokenCount || 0}
                </Typography>
                <span>/</span>
                <Typography fontSize="15px" fontWeight="500" color="#rgba(27, 27, 27, 0.8)">
                  {tokenDetails?.totalTokens || 0}
                </Typography>
              </Box>
            </Box>
            <BorderLinearProgress
              variant="determinate"
              value={((tokenDetails?.tokenCount || 0) / (tokenDetails?.totalTokens || 0)) * 100}
              barColor={
                ((tokenDetails?.tokenCount || 0) / (tokenDetails?.totalTokens || 0)) * 100 <= 10
                  ? theme.palette.error.main
                  : '#148768'
              }
            />
          </Box>
          <Box px={2} pt={1} width="100%">
            <Button startIcon={<AutoAwesomeIcon />} sx={{ width: '100%' }} onClick={handleOpenPaymentModal}>
              {ChatSidebarTitle.UPGRADE_PLAN}
            </Button>
          </Box>
          <Box
            id="account-button"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            className={styles.userDropDownBtn}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                className={styles.userImage}
                data-test-id={`chatbot-sidebar-userimage`}
                sx={{ bgcolor: 'rgb(144 202 249 / 35%)' }}
                src={`${API_BASE_URL}/${Api.profileImage}/${user?.image}`}
              />
              <Typography className={styles.userName}>{user?.name}</Typography>
            </Box>
            <IconButton onClick={handleLogout}>
              <Tooltip title="Logout">
                <LogoutIcon />
              </Tooltip>
            </IconButton>
          </Box>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'account-button'
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon onClick={handleLogout}>
                <LogoutIcon />
                <ListItemText>{ChatSidebarTitle.LOG_OUT}</ListItemText>
              </ListItemIcon>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default memo(ChatSidebarContent);
