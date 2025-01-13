'use client';
import { FC } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import MainBanner, { IBannerProps } from './banner';
import InnerCollegeBlog from './blogs';
import InnerCollegeAdmission from './admission';
import Overview from './overview-section';
import PlacementsAndSalary, { IPlacementsProps } from './placements-and-salary';
import OtherColleges, { IOtherCollegeProps } from './overview-sidebar';
import { IExamsAndCutoffsProps } from './exams-and-cutoffs';
import PlacementFacility from './placement-facility';
import Gallery, { IGalleryImageProps } from './gallery';
import StudentReviews, { ICollegeReviewsDataProps } from './students-reviews';
import ReviewPercentage, { IReviewDataProps } from './review-percentage';
import { IFAQsProps } from './overview-faq/FAQItem';
import { IBlogProps } from './blogs/Blogs';
import { IAdmissionProps } from './admission/Admission';
import { IOverviewProps } from './overview-section/OverviewContent';
import TagSection from './tags';
import { IFacilitiesProps } from './placement-facility/Facility';

import Highlights, { IHighlightsProps } from 'ui-component/college-overview-page/highlights';
import FAQSection from 'ui-component/college-overview-page/overview-faq';
import CollegeCourseFees, { ICollegeFeesProps } from 'ui-component/college-overview-page/course-fees';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IOverviewPageProps {
  data: {
    faqData: IFAQsProps;
    bannerData: IBannerProps;
    blogData: IBlogProps;
    overviewData: IOverviewProps;
    highlightData: IHighlightsProps;
    placementData: IPlacementsProps;
    admissionData: IAdmissionProps;
    otherCollegeData: IOtherCollegeProps;
    collegeReviews: ICollegeReviewsDataProps;
    examData: IExamsAndCutoffsProps;
    galleryImages: IGalleryImageProps;
    facilitiesData: IFacilitiesProps;
    courseFeesData: ICollegeFeesProps;
    reviewData: IReviewDataProps;
    subMenu: ISubMenuProps;
  };
}

const OverViewComponent: FC<IOverviewPageProps> = ({ data }) => {
  // const router = useRouter();
  // const { college, collegename } = router.query;
  const theme = useTheme();
  // const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
      <MainBanner {...data.bannerData} />
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
            <InnerCollegeBlog {...data.blogData} />
            <Overview {...data.overviewData} />
            <Highlights {...data.highlightData} />
            <PlacementsAndSalary {...data.placementData} />
            <InnerCollegeAdmission {...data.admissionData} />
            <CollegeCourseFees {...data.courseFeesData} />
            <PlacementFacility {...data.facilitiesData} />
            <Gallery {...data.galleryImages} />
            {/* need to enable once the url is ready */}
            {/* <ExamsAndCutoffs {...data.examData} /> */}
            <ReviewPercentage {...data.reviewData} />
            <StudentReviews {...data.collegeReviews} />
            <FAQSection {...data.faqData} />
            <TagSection {...data.highlightData} {...data.subMenu} />

            {matchDownlg && <OtherColleges {...data.otherCollegeData} />}
          </Box>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          md={12}
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
          }}
        >
          <Box className="stickySidebar">
            <OtherColleges {...data.otherCollegeData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default OverViewComponent;
