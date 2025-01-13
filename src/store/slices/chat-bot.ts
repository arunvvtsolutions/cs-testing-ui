// types
import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../index';

import axios from 'utils/axios';
import { API_BASE_URL } from 'config';
import { IChatBotProps } from 'ui-component/chat-bot/chatbot-window';

// project imports

// import { StudentProfileProps } from 'types/user-profile';

type InitialState = {
  error?: null | string;
  chatList: { thread_id: string; title: string }[];
  tokenDetails: { totalTokens: number; tokenCount: number } | null;
  paymentModal: boolean;
  chatHistory: IChatBotProps[];
};

// initial state
const initialState: InitialState = {
  error: null,
  chatList: [],
  tokenDetails: null,
  paymentModal: false,
  chatHistory: []
};

// ==============================|| SLICE - chatBot ||============================== //

const chatBot = createSlice({
  name: 'chatBot',
  initialState,
  reducers: {
    updateChatListData(state, action) {
      state.chatList = action.payload;
    },
    getTokenDetailsSuccess(state, action) {
      state.tokenDetails = action.payload;
    },
    openPaymentModal(state, action) {
      state.paymentModal = action.payload;
    },
    updateChatHistory(state, action) {
      state.chatHistory = action.payload;
    },
    // has error
    hasError(state, action) {
      state.error = action.payload;
    }
  }
});

export default chatBot.reducer;

export const { updateChatListData, getTokenDetailsSuccess, openPaymentModal, updateChatHistory } = chatBot.actions;

export function getChatListData() {
  return async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chatbot/chatList`);
      dispatch(chatBot.actions.updateChatListData(response.data));
    } catch (error) {
      dispatch(chatBot.actions.hasError(error));
    }
  };
}
