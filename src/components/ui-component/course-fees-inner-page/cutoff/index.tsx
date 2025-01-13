'use client';
import { FC, useEffect, useState } from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';

import CourseDetailsDesktop from '../course-info-sidebar/CourseDetails';

import CutoffInnerTable from './cutoff-table';
import CutoffsFilter from './filter';
import { ICutoffsFilter, IFilterProps } from './filter/CutoffFilterDesktop';

import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { ICutoffResultsProps, ICutoffsDataProps } from 'ui-component/college-cutoff-page/cutoff-results';
import { ISubMenuProps } from 'ui-component/subheader';

interface ICutoffInnerProps {
  // data: IBannerProps & ICutoffResultsProps & IFilterProps;
  data: {
    subMenu: ISubMenuProps;
    bannerData: IBannerProps;
    cutoffResultsData: ICutoffResultsProps;
    filteredData: IFilterProps;
  };
}

const CutoffInnerComponent: FC<ICutoffInnerProps> = ({ data }) => {
  const theme = useTheme();
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));

  const [filterdCourseData, setFilteredCourseData] = useState<ICutoffResultsProps>({
    cutoffResultsData: {
      results: [],
      years: []
    },
    hasError: false
  });
  const [filterState, setState] = useState<ICutoffsFilter>({
    caste: '',
    gender: '',
    quota: ''
  });

  useEffect(() => {
    const { filteredData } = data.filteredData;
    setState({
      caste: filteredData.caste[0]?.type,
      gender: filteredData.gender[0]?.type,
      quota: filteredData.quota[0]?.type
    });
  }, [data.filteredData]);

  useEffect(() => {
    const result: ICutoffsDataProps[] | undefined = data?.cutoffResultsData?.cutoffResultsData?.results
      .map((res) => {
        return {
          id: res.id,
          round: res.round,
          course: res.course,
          closingRank: res.closingRank.filter((rank) => {
            return (
              filterState.caste.toLowerCase() === rank.casteName.toLowerCase() &&
              filterState.gender.toLowerCase() === rank.genderName.toLowerCase() &&
              filterState.quota.toLowerCase() === rank.quotaName.toLowerCase()
            );
          })
        };
      })
      .filter((res) => res.closingRank.length > 0);

    if (result) {
      setFilteredCourseData({
        cutoffResultsData: {
          results: result,
          years: data?.cutoffResultsData?.cutoffResultsData?.years ?? []
        },
        hasError: data.cutoffResultsData.hasError
      });
    }
  }, [
    data.cutoffResultsData.cutoffResultsData,
    data.cutoffResultsData.hasError,
    filterState,
    filterState.caste,
    filterState.gender,
    filterState.quota
  ]);

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
            {matchDownlg && (
              <CutoffsFilter {...data.filteredData} setState={setState} filterState={filterState} {...data.subMenu} />
            )}
            <CutoffInnerTable filterState={filterState} {...filterdCourseData} />
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
            <CourseDetailsDesktop {...data.subMenu} />
            <CutoffsFilter {...data.filteredData} setState={setState} filterState={filterState} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CutoffInnerComponent;
