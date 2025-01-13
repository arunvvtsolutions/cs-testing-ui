/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IconButton, useMediaQuery } from '@mui/material';
// import ChatSidebarContent from './sidebarContent';
import { ChevronLeft } from '@mui/icons-material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { IChatBotProps } from '../chatbot-window';

import styles from './chatSiderBar.module.css';
import ChatMobileHeader from './ChatMobileHeader';
import { ChatSidebarTitle } from './constant';
import ChatSidebarContent from './sidebarContent';
import PaymentModal from './PaymentModal';

import { useDispatch, useSelector } from 'store';
import { openChatDrawer } from 'store/slices/menu';
import { IPricingDetails } from 'ui-component/dashboard/connect-to-mentor/payment-details';
import { getPaymentProducts } from 'utils/api/payment';
import { getTokenDetailsSuccess, openPaymentModal, updateChatHistory } from 'store/slices/chat-bot';
import { getChatbotHistory, getTokenDetails } from 'utils/api/chat-bot';
import useAuth from 'hooks/useAuth';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{ open: boolean; drawerWidth: string }>(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: `${drawerWidth}`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const PersistentDrawerLeft = ({
  children,
  drawerWidth = '320px',
  anchor,
  hideAppBar = false
}: {
  children: React.ReactNode;
  drawerWidth?: string;
  anchor: 'left' | 'right';
  hideAppBar?: boolean;
}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:1400px)');
  const chatDrawer = useSelector((state) => state.menu.chatDrawer);
  const { paymentModal, tokenDetails } = useSelector((state) => state.chatBot);
  const [sidebarWidth, setSidebarWidth] = React.useState<string>(drawerWidth);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [paymentDetails, setPaymentDetails] = React.useState<IPricingDetails[]>();
  const params = useParams();
  const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open'
  })<{
    open?: boolean;
    drawerWidth: string;
  }>(({ theme, open, drawerWidth }) => ({
    flexGrow: 1,
    padding: 0,
    paddingX: '10px',
    backgroundColor: '#eef2f6',
    minHeight: '100vh',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: isMobile ? `0px` : `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  }));

  const handleOpenPaymentModal = () => {
    setChatOpen(false);
    dispatch(openPaymentModal(true));
  };

  React.useEffect(() => {
    if (tokenDetails !== null && !tokenDetails.tokenCount) handleOpenPaymentModal();
  }, [tokenDetails, tokenDetails?.tokenCount, tokenDetails?.totalTokens]);

  React.useEffect(() => {
    if (isMobile) {
      setSidebarWidth('80%');
      dispatch(openChatDrawer(false));
    }
    const getData = async () => {
      try {
        const data = await getPaymentProducts();
        const tokenDetails = await getTokenDetails();
        dispatch(getTokenDetailsSuccess(tokenDetails || { totalTokens: 0, tokenCount: 0 }));
        setPaymentDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      try {
        if (params?.threadId?.[0]) {
          const chatList = await getChatbotHistory(params?.threadId[0]);
          const newChatHistory: IChatBotProps[] = chatList.map((chat: any) => {
            // chat.visualization
            //     ? {
            //         categorical_data: JSON.parse(chat.visualization).categorical_data?.map((ctgryData: any) => ({
            //           name: ctgryData.Column_name,
            //           data: ctgryData.data
            //         })),
            //         numerical_data: JSON.parse(chat.visualization).numerical_data.map((numericData: any) => ({
            //           name: numericData.Column_name,
            //           data: numericData.data
            //         }))
            //       }
            //     :
            return {
              ...chat,
              visualization: {}
              // visualization_descriptions: JSON.parse(chat.visualization_content)
            };
          });
          dispatch(updateChatHistory(newChatHistory));
        } else dispatch(updateChatHistory([]));
      } catch (error) {
        dispatch(updateChatHistory([]));
      }
    };
    getData();
  }, [params?.threadId?.[0]]);

  React.useEffect(() => {
    if (user && user.chatbotAgent !== 0 && !user.chatbotAgent) router.push('/agent-dashboard');
  }, [user]);

  return (
    <>
      <Box sx={{ display: 'flex', background: '#eef2f6' }}>
        {!hideAppBar && isMobile && (
          <AppBar
            position="fixed"
            open={chatDrawer}
            drawerWidth={drawerWidth}
            sx={{ background: '#fff', display: 'flex' }}
          >
            <ChatMobileHeader setOpen={setChatOpen} />
          </AppBar>
        )}
        <Drawer
          onClose={() => (isMobile ? setChatOpen(false) : dispatch(openChatDrawer(false)))}
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: sidebarWidth,
              boxSizing: 'border-box'
            }
          }}
          variant={isMobile ? 'temporary' : 'persistent'}
          anchor={anchor}
          open={isMobile ? chatOpen : chatDrawer}
        >
          <Box className={styles.siderBarHeader}>
            {isMobile && (
              <IconButton onClick={() => (isMobile ? setChatOpen(false) : dispatch(openChatDrawer(false)))}>
                <ChevronLeft className={styles.mobileCloseIcon} />
              </IconButton>
            )}
            <Box className={styles.logoMini}>
              <Image src="/assets/images/logomini2.webp" alt="" width={40} height={40} />
            </Box>

            <span>{ChatSidebarTitle.COLLEGE_SUGGEST}</span>
          </Box>

          <Divider />
          <Box className={styles.scrollContent}>
            <ChatSidebarContent
              setOpen={setChatOpen}
              handleOpenPaymentModal={handleOpenPaymentModal}
              selectedAgent={user?.chatbotAgent || 0}
            />
          </Box>
        </Drawer>
        <Main open={isMobile ? false : chatDrawer} drawerWidth={sidebarWidth}>
          {children}
        </Main>
      </Box>
      {openPaymentModal && paymentDetails && (
        <PaymentModal
          handleClose={() => dispatch(openPaymentModal(false))}
          open={paymentModal}
          paymentDetailsData={paymentDetails}
          setPaymentDetails={setPaymentDetails}
        />
      )}
    </>
  );
};

export default React.memo(PersistentDrawerLeft);
