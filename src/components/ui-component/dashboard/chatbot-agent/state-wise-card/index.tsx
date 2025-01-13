'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useRouter } from 'next/navigation';

import { StateWiseTiles } from '../constant';
import styles from '../styles.module.css';

import useAuth from 'hooks/useAuth';
import { getQuotaList, updateAgent } from 'utils/api/chatbot-agent';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IStateProps {
  id: number;
  name: string;
  shortName: string;
  shortUrl: string;
  endPoint: string | null;
  status: number;
  quotaType: number;
}

export interface IStatePropsData extends IErrorProps {
  title: string;
}

const StateWiseCard: FC<IStatePropsData> = ({ title, hasError }) => {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState<number | undefined>();
  const [quotaList, setQuotaList] = useState<IStateProps[]>([]);

  const handleSeeAll = () => {
    setVisible(!visible);
  };

  const handleChecked = async (agentId: number) => {
    await updateAgent(agentId);
    await updateProfile({ ...user, chatbotAgent: agentId });
    router.push('/chat-bot');
    setChecked(agentId);
  };

  useEffect(() => {
    const getData = async () => {
      const stateData = await getQuotaList();
      setQuotaList(
        stateData.filter((data) => {
          if (title === StateWiseTiles.ALL_INDIA_QUOTA) return data.quotaType === 0;
          else return data.quotaType === 1;
        })
      );
    };
    getData();
    if (user?.chatbotAgent) setChecked(user.chatbotAgent);
  }, [title, user]);

  return (
    <Box className={styles.StateCard}>
      <Typography variant="h6" className={styles.titleTxt}>
        {title}
      </Typography>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          <Grid container spacing={2} mt={1}>
            {quotaList.slice(0, visible ? quotaList.length : 7).map((state, index) => (
              <Grid item key={index} xs={3} md={3} lg={3} sx={{ position: 'relative', padding: '0 !important' }}>
                {state.status === 1 && (
                  <Box className={styles.comingSoon}>
                    <Typography fontWeight="600" color="#000" textAlign="center">
                      {StateWiseTiles.COMING_SOON}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ filter: `blur(${state.status === 1 ? 5 : 0}px)` }}>
                  <Button
                    disabled={state.status === 1}
                    sx={{ backgroundColor: state.status === 1 ? 'transparent !important' : '#FFF' }}
                    variant="contained"
                    className={
                      checked === state.id ? `${styles.stateWiseBtn} ${styles.active} ` : `${styles.stateWiseBtn}`
                    }
                    onClick={() => handleChecked(state.id)}
                  >
                    <Typography variant="h5" className={styles.stateWiseShortName}>
                      {state.shortName}
                    </Typography>
                    <Typography variant="h6" className={styles.stateWiseName}>
                      {state.name}
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            ))}
            {quotaList.length > 7 && (
              <Grid item xs={3} md={3} lg={3}>
                <Box className={styles.seeAllBtn}>
                  <Button variant="outlined" onClick={handleSeeAll}>
                    {visible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </Button>
                  <Typography variant="h6">{visible ? StateWiseTiles.SEE_ALL : StateWiseTiles.SEE_LESS}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default StateWiseCard;
