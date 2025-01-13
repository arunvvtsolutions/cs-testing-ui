'use client';
import { Box, Grid, Typography } from '@mui/material';

import { Exams } from '../../../../constants/index';
import { HerominiTxt } from '../banner-page/styles';

import {
  Section,
  Container,
  MainLink,
  LinkBox,
  MainBox,
  InsideLinkBox,
  InnerMainBox,
  InnerHeading1,
  InnerDescription1,
  InnerHeading2,
  InnerDescription2,
  SubInnerHeading
} from './styles';
import { RankingTitles, LinkText } from './constant';

import { MEDICAL_BASE_URL } from 'config';
const RankingsAndExams: React.FC = () => {
  return (
    <Section>
      <Container>
        <Box sx={{ marginBottom: '30px' }}>
          <Typography variant="h2" className="h2_tag">
            {RankingTitles.RANKING_HEADING}
          </Typography>
          <HerominiTxt style={{ maxWidth: '500px' }}>{RankingTitles.RANKING_DESC}</HerominiTxt>
        </Box>
        <Box>
          <Grid container>
            <MainBox xl={6} md={6} xs={12}>
              <InnerMainBox>
                <SubInnerHeading>
                  <InnerHeading1>{RankingTitles.RANKING_SUBHEADING}</InnerHeading1>
                  <InnerDescription1>{RankingTitles.RANKING_SUBDESC}</InnerDescription1>
                </SubInnerHeading>
                <LinkBox>
                  <InsideLinkBox>
                    <MainLink href={`https://collegesuggest.com/top/engineering/colleges-in-india`} prefetch={false}>
                      {LinkText.ENGINEERING_COLLEGES}
                    </MainLink>
                  </InsideLinkBox>
                  <InsideLinkBox>
                    <MainLink href={`${MEDICAL_BASE_URL}/top/medical/colleges-in-india`} prefetch={false}>
                      {LinkText.MEDICAL_COLLEGES}
                    </MainLink>
                  </InsideLinkBox>
                  <InsideLinkBox>
                    <MainLink href={`${MEDICAL_BASE_URL}/top/dental/colleges-in-india`} prefetch={false}>
                      {LinkText.DENTAL_COLLEGES}
                    </MainLink>
                  </InsideLinkBox>
                  <InsideLinkBox>
                    <MainLink href={`https://collegesuggest.com/top/architecture/colleges-in-india`} prefetch={false}>
                      {LinkText.ARCHITECTURE_COLLEGES}
                    </MainLink>
                  </InsideLinkBox>
                </LinkBox>
              </InnerMainBox>
            </MainBox>
            <MainBox xl={6} md={6} xs={12}>
              <InnerMainBox>
                <SubInnerHeading>
                  <InnerHeading2>{RankingTitles.EXAMS_HEADING}</InnerHeading2>
                  <InnerDescription2>{RankingTitles.EXAMS_SUBDESC}</InnerDescription2>
                </SubInnerHeading>
                <Box>
                  <LinkBox>
                    <InsideLinkBox>
                      <MainLink href="/">{Exams.JEE_MAIN_EXAM}</MainLink>
                    </InsideLinkBox>
                    <InsideLinkBox>
                      <MainLink href="/">{Exams.VITEEE_ENTRANCE_EXAM}</MainLink>
                    </InsideLinkBox>
                    <InsideLinkBox>
                      <MainLink href="/">{Exams.JEE_ADVANCED}</MainLink>
                    </InsideLinkBox>
                  </LinkBox>
                </Box>
              </InnerMainBox>
            </MainBox>
          </Grid>
        </Box>
      </Container>
    </Section>
  );
};
export default RankingsAndExams;
