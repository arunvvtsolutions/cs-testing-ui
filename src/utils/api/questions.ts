/* eslint-disable @typescript-eslint/no-explicit-any */

import { getBannerData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { IQuestionPageProps, Stream } from 'types';
import { Api } from 'types/enums';
import { IProfileDataProps, IReplayprops } from 'ui-component/college-question-page/question-replay-accordion';

export const getQuestions = async (collegeName: string, stream: string) => {
  const data: any = {
    hasError: false,
    profileData: [],
    stream: ''
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeQuestionAndAnswer}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.profileData = response;
    }
  } catch (error) {
    data.hasError = true;
  }

  return data;
};

export const getReplayData = async (questionId: number, collegeName: string | string[] | undefined, stream: string) => {
  let data: IReplayprops[] = [];
  try {
    const res = await fetch(`/${Api.replayPost}?collegeName=${collegeName}&stream=${stream}&questionId=${questionId}`);

    if (res.ok) {
      const response = await res.json();
      data = [response];
    }
  } catch (error) {}

  return data;
};
//get client side question data
export const getQuestionList = async (collegeName: string, stream: string) => {
  const data: IProfileDataProps = {
    profileData: [],
    stream
  };
  try {
    const res = await fetch(`/${Api.questionPost}?collegeName=${collegeName}&stream=${stream}`);

    if (res.ok) {
      const result = await res.json();
      data.profileData = result.profileData;
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};
//Post api
export const postQuestions = async (data: any) => {
  let questionData: IProfileDataProps = {
    profileData: [],
    stream: data.stream
  };
  try {
    await fetch(`/${Api.questionPost}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    questionData = await getQuestionList(data.collegeUrl, data.stream);
    return questionData;
  } catch (error) {
    console.log(error);
  }
};

export const postReplay = async (data: any) => {
  try {
    await fetch(`/${Api.replayPost}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const questionReplay = await getReplayData(data.questionId, data.collegeUrl, data.stream);
    return questionReplay;
  } catch (error) {
    throw error;
  }
};

export const getQuestionData = async ({
  params,
  domain
}: {
  params: { name: string; ins: string };
  domain: string;
}): Promise<IQuestionPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const QuestionResponse = await getQuestions(params.name, stream);
  // const QuestionReplayResponse = await getQuestions(params.name, stream);

  const data: IQuestionPageProps = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    profileData: QuestionResponse
    // replayData: QuestionReplayResponse
  };
  return data;
};
