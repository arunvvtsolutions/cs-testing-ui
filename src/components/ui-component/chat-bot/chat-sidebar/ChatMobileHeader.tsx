import { Box, Button, Drawer, IconButton, List, ListItem, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRouter } from 'next/navigation';

import { IAgentDetails } from '../chatbot-window';

import styles from './chatSiderBar.module.css';
import { ChatSidebarTitle } from './constant';

import { useDispatch } from 'store';
import { openChatDrawer } from 'store/slices/menu';
import useAuth from 'hooks/useAuth';
import { getAgentDetails } from 'utils/api/chatbot-agent';
const ChatMobileHeader = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width:1400px)');
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const [chatBotAgentDetails, setAgentDetails] = useState<IAgentDetails | null>();
  // Function to toggle Drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user?.chatbotAgent && isMobile) {
        const agentData = await getAgentDetails(user.chatbotAgent);
        setAgentDetails(agentData);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box className={styles.MobileHeaderWrap}>
      <Box className={styles.logoWrapper}>
        <Box className={styles.logoMini}>
          <Image src="/assets/images/logomini2.webp" alt="" width={40} height={40} />
        </Box>
        <IconButton
          className={styles.MobileLinksIcns}
          onClick={() => (isMobile ? setOpen(true) : dispatch(openChatDrawer(true)))}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Typography className={styles.agentName}>{chatBotAgentDetails?.name}</Typography>

      <Box className={styles.headerRightColMob}>
        {/* <IconButton className={`${styles.MobileLinksIcns} ${styles.active}`} onClick={() => router.push(`/chat-bot`)}>
          <AddIcon />
        </IconButton> */}

        <Button startIcon={<AddIcon />} className={styles.mobileNewChatBtn} onClick={() => router.push(`/chat-bot`)}>
          {ChatSidebarTitle.NEW_CHAT}
        </Button>
        {/* button below to open visualization sidebar  */}
        {/* <IconButton
          className={styles.MobileLinksIcns}
          onClick={() => dispatch(openVisualizationDrawer(!visualizationDrawer))}
        >
          <CodeIcon />
        </IconButton> */}
        {/* <IconButton className={styles.MobileLinksIcns} onClick={toggleDrawer}>
          <MoreVertIcon />
        </IconButton> */}

        {/* <Box className={styles.userPic}>
          <Avatar
            sx={{
              bgcolor: 'rgb(144 202 249 / 35%)',
              width: '30px',
              height: '30px'
            }}
            src={`${API_BASE_URL}/${Api.profileImage}/${user?.image}`}
          />
        </Box> */}
      </Box>
      <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer}>
        <List className={styles.mobileOptionList}>
          <ListItem disablePadding>
            <Button className={styles.mobileOptionListButton}>
              <PushPinOutlinedIcon className={styles.leftIcn} /> {ChatSidebarTitle.PIN}
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button className={styles.mobileOptionListButton}>
              <EditOutlinedIcon className={styles.leftIcn} />
              {ChatSidebarTitle.RENAME}
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button className={`${styles.mobileOptionListButton} ${styles.danger}`}>
              <DeleteOutlineOutlinedIcon className={styles.leftIcn} sx={{ color: 'red' }} /> {ChatSidebarTitle.DELETE}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default ChatMobileHeader;
