import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import axiosServices from 'utils/axios';
import axios from 'utils/axios';

export const getChatbotHistory = async (threadId: string) => {
  try {
    const result = await axios.get(`${API_BASE_URL}/${Api.getChatHistory}/${threadId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getNewChat = async (threadId: string, question: string, agentShortUrl: string, selectedAgent: number) => {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/${Api.getNewChat}?threadId=${threadId}&prompt=${question}&agentShortUrl=${agentShortUrl}&agentId=${selectedAgent}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateChat = async (
  threadId: string,
  question: string,
  agentShortUrl: string,
  agentId: number,
  updateData: { query: string; requestTime: Date }
) => {
  try {
    return await axios.post(
      `${API_BASE_URL}/${Api.updateChatList}/${threadId}/${question}/${agentShortUrl}/${agentId}`,
      updateData
    );
  } catch (error) {
    console.log(error);
  }
};

export const getChatListData = async (selectedAgent: number) => {
  try {
    return await axios.get(`${API_BASE_URL}/${Api.getChatList}/${selectedAgent}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateChatListData = async (
  threadId: string,
  updateData: { pin: string | null; delete: string | null; rename: string }
) => {
  try {
    return await axios.post(`${API_BASE_URL}/${Api.getUpdateChatList}/${threadId}`, updateData);
  } catch (error) {
    console.log(error);
  }
};

export const getTokenDetails = async () => {
  const result = await axiosServices.get(`${API_BASE_URL}/${Api.getTokenData}`);
  return result.data[0];
};
