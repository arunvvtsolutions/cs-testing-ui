import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { IScheduleYourAppointment } from 'ui-component/dashboard/connect-to-mentor/schedule-appointment';
import axios from 'utils/axios';

export const getAvailableTime = async () => {
  const data: IScheduleYourAppointment = {
    timeData: [],
    hasError: false
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${Api.getAvailableTimeData}`);

    if (res.ok) {
      data.timeData = await res.json();
    }
  } catch (error) {
    data.hasError = true;
  }

  return data;
};
export const getTimeValue = async (date: string | null) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${Api.getTimeValueData}/${date}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const postScheduleTimeData = async (
  date: string,
  time: number,
  message: string,
  startTime: string,
  endTime: string,
  email: string | undefined
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/${Api.addScheduleTimeData}`, {
      date,
      time,
      message,
      startTime,
      endTime,
      email
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getScheduledDetails = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${Api.getScheduledDetailsData}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
