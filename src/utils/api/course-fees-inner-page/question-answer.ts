/* eslint-disable @typescript-eslint/no-explicit-any */

import { getBannerData, getOtherCourseData, getSubMenuData } from '../common';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { IProfileDataProps, IReplayprops } from 'ui-component/college-question-page/question-replay-accordion';
import { ICourseFeeQnAProps, Stream } from 'types';
import { IQnAParamsProps } from 'app/(guest)/[ins]/[name]/course-fees/[courseName]/question-answer/page';

export const getQuestionAnswer = async (collegeName: string, courseName: string, stream: string) => {
  const data: any = {
    hasError: false,
    profileData: [],
    stream: ''
  };
  try {
    const res1 = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeInnerQuestions}/${collegeName}/${courseName}`);

    if (res1.ok) {
      const response = await res1.json();
      data.profileData = response;
    }
  } catch (error) {
    data.hasError = true;
  }

  return data;
};

export const getQuestionReplay = async (questionId: number, stream: string) => {
  let data: IReplayprops[] = [];
  try {
    const res = await fetch(`/${Api.innerQuestionReplay}?stream=${stream}&questionId=${questionId}`);

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {}
  return data;
};

//client side get question list
export const getQuestionList = async (collegeName: string, courseName: string, stream: string) => {
  const data: IProfileDataProps = {
    profileData: [],
    stream
  };
  try {
    const res = await fetch(
      `/${Api.innerQuestionPost}?collegeName=${collegeName}&stream=${stream}&courseName=${courseName}`
    );

    if (res.ok) {
      const result = await res.json();
      data.profileData = result.profileData;
    }
  } catch (error) {
    console.log(error);
  }

  return data;
};
export const postQuestionAnswer = async (data: any) => {
  let questionData: IProfileDataProps = {
    profileData: [],
    stream: data.stream
  };
  try {
    await fetch(`/${Api.innerQuestionPost}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    questionData = await getQuestionList(data.collegeUrl, data.courseName, data.stream);
    return questionData;
  } catch (error) {
    console.log(error);
  }
};

export const postQuestionAnswerReply = async (data: any) => {
  try {
    await fetch(`/${Api.innerQuestionReplay}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const questionReplay = await getQuestionReplay(data.questionId, data.stream);
    return questionReplay;
  } catch (error) {
    throw error;
  }
};

export const getCourseFeesQnA = async ({
  params,
  domain
}: {
  params: IQnAParamsProps;
  domain: string;
}): Promise<ICourseFeeQnAProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const otherCoursesDataResponse = await getOtherCourseData(params.name, params.ins, stream);
  const questionAnswerResponse = await getQuestionAnswer(params.name, params.courseName, stream);
  const data: ICourseFeeQnAProps = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    otherCourseData: otherCoursesDataResponse,
    profileData: questionAnswerResponse
  };
  return data;
};
