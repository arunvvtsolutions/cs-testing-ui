/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';

import Page from 'components/ui-component/Page';
import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import Layout from 'layout';
// all course fee datas passed below
import SubHeader from 'ui-component/subheader';
import QuestionAnswerInnerComponent, { IQAndAInnerProps } from 'ui-component/course-fees-inner-page/question-answer';
import { getBannerData, getOtherCourseData, getSubMenuData } from 'utils/api/common';
import { getQuestionAnswer } from 'utils/api/course-fees-inner-page/question-answer';
import { Stream } from 'types';

const QuestionAnswerInnerPage = ({ data }: IQAndAInnerProps) => {
  return (
    <>
      <Page title="">
        <Box>
          <SubHeader {...data.subMenu} />
          <ContainerWrapper>
            <QuestionAnswerInnerComponent data={data} />
          </ContainerWrapper>
        </Box>
      </Page>
    </>
  );
};

QuestionAnswerInnerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name, courseName } = params;

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const otherCoursesDataResponse = await getOtherCourseData(name, ins, stream);
  const questionAnswerResponse = await getQuestionAnswer(name, courseName, stream);
  const questionAnswerReplayResponse = await getQuestionAnswer(name, courseName, stream);
  const data: unknown = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    otherCourseData: otherCoursesDataResponse,
    profileData: questionAnswerResponse,
    replayData: questionAnswerReplayResponse
  };
  return {
    props: {
      data
    }
  };
};

export default QuestionAnswerInnerPage;
