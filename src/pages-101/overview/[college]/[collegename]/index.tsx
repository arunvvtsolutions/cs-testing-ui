import { ReactElement } from 'react';
// import { useRouter } from 'next/router';
// material-ui
import { Box } from '@mui/material';
// project imports
// import { Box, useTheme } from '@mui/system';
import Grid from '@mui/material/Grid';

// import CollegeReview from '../../../../components/ui-component/college-overview-page/students-reviews/MockData.json';
// import FAQdata from '../../../../components/ui-component/college-overview-page/overview-faq/faqData.json';
// import tagData from '../../../../components/ui-component/college-overview-page/tags/tagData.json';
// import bannerData from '../../../../components/ui-component/college-overview-page/banner/bannerData.json';
// import blogData from '../../../../components/ui-component/college-overview-page/blogs/latestBlogs.json';
// import admissionData from '../../../../components/ui-component/college-overview-page/admission/admission.json';
// import highlightData from '../../../../components/ui-component/college-overview-page/highlights/highLightsData.json';
// import placementData from '../../../../components/ui-component/college-overview-page/placements-and-salary/placementsData.json';

import Layout from 'layout';
import Page from 'components/ui-component/Page';
import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import SubHeader from 'ui-component/subheader';
// import ReviewPercentage from 'ui-component/college-overview-page/review-percentage';
// import StudentReviews from 'ui-component/college-overview-page/students-reviews';
// student review component mockupdate passed from below
// import FAQSection from 'ui-component/college-overview-page/overview-faq';
// import TagSection from 'ui-component/college-overview-page/tags';
// import MainBanner from 'ui-component/college-overview-page/banner';
// import InnerCollegeBlog from 'ui-component/college-overview-page/blogs';
// import overviewData from 'components/ui-component/college-overview-page/overview-section/overviewData.json';
// import InnerCollegeAdmission from 'ui-component/college-overview-page/admission';
// import Overview from 'ui-component/college-overview-page/overview-section';
// import Highlights from 'ui-component/college-overview-page/highlights';
// import PlacementsAndSalary from 'ui-component/college-overview-page/placements-and-salary';
// import OtherColleges from 'ui-component/college-overview-page/overview-sidebar';
// import otherCollegeData from 'ui-component/college-overview-page/overview-sidebar/otherCollegeData.json';
// import ExamsAndCutoffs from 'ui-component/college-overview-page/exams-and-cutoffs';
// import examData from 'ui-component/college-overview-page/exams-and-cutoffs/examsData.json';
// import Facility from 'ui-component/college-overview-page/placement-facility/Facility';
// import Gallery from 'ui-component/college-overview-page/gallery';
// import galleryImages from 'ui-component/college-overview-page/gallery/galleryData.json';
// import { CollegeCourseFeesDetails } from "ui-component/college-overview-page/course-fees/constant";
// import CollegeCourseFees from 'ui-component/college-overview-page/course-fees';
// import Coursesfeesdata from 'ui-component/college-overview-page/course-fees/coursesfeesdata.json';
// import facilitiesData from 'ui-component/college-overview-page/placement-facility/facilitiesData.json';
// import reviewData from 'ui-component/college-overview-page/review-percentage/reviewData.json';
const OverView = () => {
  // const router = useRouter();
  // const { college, collegename } = router.query;
  // const theme = useTheme();
  // const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  // const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Page title="">
      <Box>
        <ContainerWrapper>
          <SubHeader />
          {/* <MainBanner bannerData={bannerData} /> */}
          <Grid container spacing={2}>
            <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
              <Box
                sx={{
                  paddingRight: {
                    xl: '30px',
                    lg: '0px',
                    md: '0px',
                    sm: '0px',
                    xs: '0px'
                  }
                }}
              >
                {/* <InnerCollegeBlog blogData={blogData} />
                <Overview overviewData={overviewData} />
                <Highlights highlightData={highlightData} />
                <PlacementsAndSalary placementData={placementData} />
                <InnerCollegeAdmission admissionData={admissionData} />
                <CollegeCourseFees courseFeesData={Coursesfeesdata} />
                <Facility facilitiesData={facilitiesData} />
                <Gallery galleryImages={galleryImages} />
                <ExamsAndCutoffs examData={examData} />
                <ReviewPercentage reviewData={reviewData} />
                <StudentReviews collegeReviews={CollegeReview} />
                {/* <FAQSection faqData={FAQdata.faqs} shortName={FAQdata.shortname} /> */}
                {/* <TagSection tagData={tagData} /> */}
                {/* {isMdDown && <OtherColleges otherCollegeData={otherCollegeData} />} */}
              </Box>
            </Grid>
            <Grid
              item
              xl={4}
              sx={{
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
              }}
            >
              <Box className="stickySidebar">{/* <OtherColleges otherCollegeData={otherCollegeData} /> */}</Box>
            </Grid>
          </Grid>
        </ContainerWrapper>
      </Box>
      {/* listing page ends here */}
    </Page>
  );
};
OverView.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default OverView;
