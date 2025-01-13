import axios from 'axios';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { IPropslideBannerData } from 'ui-component/dashboard/chatbot-agent/slide-banner/SlideBanner';
import { IStateProps } from 'ui-component/dashboard/chatbot-agent/state-wise-card';
import axiosServices from 'utils/axios';

export const getQuotaList = async () => {
  let data: IStateProps[] = [];
  try {
    const result = await axios.get(`${API_BASE_URL}/${Api.getQuotaList}`);
    data = result.data;
  } catch (error) {
    data = [];
  }
  return data;
};

export const getBannerList = async () => {
  const data: IPropslideBannerData = {
    sliderData: [],
    hasError: false
  };
  try {
    const result = await axios.get(`${API_BASE_URL}/${Api.getStateWiseBanner}`);
    data.sliderData = result.data;
  } catch (error) {
    data.hasError = false;
  }
  return data;
};

export const updateAgent = async (selectedAgent: number) => {
  const result = await axiosServices.patch(`${API_BASE_URL}/${Api.updateChatbotAgent}`, { selectedAgent });
  return result.data;
};

export const getAgentDetails = async (agentId: number) => {
  const result = await axiosServices.get(`${API_BASE_URL}/${Api.getAgentDetails}/${agentId}`);
  return result.data[0];
};
