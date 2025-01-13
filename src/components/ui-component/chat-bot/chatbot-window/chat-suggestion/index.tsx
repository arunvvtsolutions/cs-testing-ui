import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, useMediaQuery } from '@mui/material';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';

import styles from '../style.module.css';
import { CHATBOT_CONSTANTS } from '../constant';

import { SUGGESTION_CONTANTS } from './constant';

import { useSelector } from 'store';
interface IChatSuggestProps {
  handleAddQuestion: (content?: string) => void;
}
const ChatSuggestions: React.FC<IChatSuggestProps> = ({ handleAddQuestion }) => {
  const isLgDown = useMediaQuery('(max-width:992px)');
  const neetData = useSelector((state) => state.neetPredictor.neetPredictorFormData);
  return (
    <>
      <Box className={styles.suggestionBox}>
        <Box sx={{ flexGrow: 1 }} className={styles.suggestionWrapper}>
          <Grid container spacing={1} marginBottom={'10px'}>
            <Grid item lg={6} sm={6} xs={12}>
              <Button
                className={styles.suggestionsBtn}
                variant="outlined"
                onClick={() => handleAddQuestion(SUGGESTION_CONTANTS.SCORE_SUGGESTION)}
              >
                <strong>{SUGGESTION_CONTANTS.SCORE_SUGGESTION_HEADING}</strong>
                {SUGGESTION_CONTANTS.SCORE_SUGGESTION}
                <Box className={styles.suggestionIcnWrap}>
                  <ShortcutOutlinedIcon className={styles.suggestionIcn} />
                </Box>
              </Button>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <Button
                className={styles.suggestionsBtn}
                variant="outlined"
                onClick={() =>
                  handleAddQuestion(
                    neetData.neetRank && neetData.stateName && neetData.stateCategory
                      ? `My rank is ${neetData.neetRank} my home state is ${neetData.stateName}, and I belong to the ${neetData.stateCategory} category`
                      : SUGGESTION_CONTANTS.RANK_SUGGESTION
                  )
                }
              >
                <strong>
                  {neetData.neetRank && neetData.stateName && neetData.stateCategory
                    ? CHATBOT_CONSTANTS.SUGGEST_CONTENT
                    : SUGGESTION_CONTANTS.RANK_SUGGESTION_HEADING}
                </strong>
                {neetData.neetRank && neetData.stateName && neetData.stateCategory
                  ? `My rank is ${neetData.neetRank} my home state is ${neetData.stateName}, and I belong to the ${neetData.stateCategory} category`
                  : SUGGESTION_CONTANTS.RANK_SUGGESTION}
                <Box className={styles.suggestionIcnWrap}>
                  <ShortcutOutlinedIcon className={styles.suggestionIcn} />
                </Box>
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={1} display={isLgDown ? 'none' : 'null'}>
            <Grid item lg={6} sm={6} xs={12}>
              <Button
                className={styles.suggestionsBtn}
                variant="outlined"
                onClick={() => handleAddQuestion(SUGGESTION_CONTANTS.STATE_SUGGESTION)}
              >
                <strong>{SUGGESTION_CONTANTS.STATE_SUGGESTION_HEADING}</strong>
                {SUGGESTION_CONTANTS.STATE_SUGGESTION}
                <Box className={styles.suggestionIcnWrap}>
                  <ShortcutOutlinedIcon className={styles.suggestionIcn} />
                </Box>
              </Button>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <Button
                className={styles.suggestionsBtn}
                variant="outlined"
                onClick={() => handleAddQuestion(SUGGESTION_CONTANTS.CATEGORY_SUGGESTION)}
              >
                <strong>{'Get Your Tailored Colleges'}</strong>
                {SUGGESTION_CONTANTS.CATEGORY_SUGGESTION}
                <Box className={styles.suggestionIcnWrap}>
                  <ShortcutOutlinedIcon className={styles.suggestionIcn} />
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ChatSuggestions;
