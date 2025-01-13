/* eslint-disable react-hooks/exhaustive-deps */
// material-ui
'use client';
import { useMediaQuery, Grid } from '@mui/material';
import { Box, useTheme } from '@mui/system';
// project imports
import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

import NoDataCard from '../cards/no-data-card';
import { ErrorSnackbar, SuccessSnackbar } from '../snackbar-type';

import { CollegeListCardConstants } from './constants';

import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import ListingPageCards from 'ui-component/listing-page/college-card';
import CollegeFilter from 'ui-component/listing-page/filter';
import ListingTopFilters from 'ui-component/listing-top-filters';
import TopBanner from 'ui-component/listing-page/top-banner';
import CollegeCount from 'ui-component/listing-top-filters/CollegeCount';
import { getStudentBookMark, postStudentBookMark, putStudentBookMark } from 'utils/api/student-dashboard';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ICollegeData, ICollege, IFilterData, IPageData } from 'types/college';
import { filterColleges, findCollegeCategory, findStream, sortColleges } from 'utils';
import {
  getTopCollegesCategoryPageData,
  getTopCollegesCoursePageData,
  getTopCollegesPageData,
  getTopTenCollegesPageData
} from 'utils/api/common';
import useAuth from 'hooks/useAuth';

interface ICollegeListProps {
  topColleges: ICollegeData;
  enableLoadMore?: boolean;
  disablePagination?: boolean;
}

const CollegeListCard: React.FC<ICollegeListProps> = ({
  topColleges,
  enableLoadMore = true,
  disablePagination = false
}) => {
  const theme = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const [searchText, setSearchText] = useState<string>('');
  const [filterDataState, setFilterDataState] = useState<IFilterData>({
    state: [],
    city: [],
    ownership: [],
    category: [],
    course: []
  });
  const [sortKey, setSortKey] = useState<string>('nirfRank');
  const [collegeData, setCollegeData] = useState<ICollege[]>(topColleges.collegeData);
  const [bookMarkArray, setBookMarkArray] = useState<number[]>([]);
  const [pageData, setPageData] = useState<IPageData>();
  const params = useParams();
  const categoty = params?.category;
  const clgSubstream = params?.substream;
  const place = params?.place;
  const course = params?.course;
  const pathName = usePathname();

  const filterHandler = (filterData: IFilterData) => {
    if (
      filterData.state.length === 0 &&
      filterData.city.length === 0 &&
      filterData.ownership.length === 0 &&
      filterData.category.length === 0
    )
      setCollegeData(topColleges.collegeData);
    setFilterDataState(filterData);
  };

  const handleSortChange = (key: string) => {
    setSortKey(key);
    filterColleges(collegeData, filterDataState, searchText, setCollegeData);
  };

  const handleUpdateBookMark = async (collegeId: number, stream: string, collegeShortUrl: string) => {
    if (user?.id) {
      if (bookMarkArray.includes(collegeId)) {
        setBookMarkArray((prev) => [...prev.filter((clgId) => clgId !== collegeId)]);
        dispatch(openSnackbar(SuccessSnackbar(CollegeListCardConstants.BOOKMARK_ADDED_SUCCESSFULLY)));
        await putStudentBookMark(Number(user.id), collegeShortUrl, stream);
      } else {
        setBookMarkArray((prev) => [...prev, collegeId]);
        dispatch(openSnackbar(SuccessSnackbar(CollegeListCardConstants.BOOKMARK_REMOVED_SUCCESSFULLY)));
        await postStudentBookMark(Number(user.id), collegeId, stream);
      }
    } else dispatch(openSnackbar(ErrorSnackbar(CollegeListCardConstants.BOOKMARK_LOGIN_MESSAGE)));
  };

  useEffect(() => {
    filterColleges(topColleges.collegeData, filterDataState, searchText, setCollegeData);
  }, [filterDataState, searchText]);

  useEffect(() => {
    sortColleges(sortKey, collegeData, setCollegeData);
  }, [sortKey]);

  useEffect(() => {
    setCollegeData(topColleges.collegeData);
  }, [topColleges.collegeData]);

  // to get readmore content
  useEffect(() => {
    const getData = async () => {
      const { stream } = findStream(window.location.host);
      const { subStream } = findStream(pathName || '');
      const { collegeCategory } = findCollegeCategory(pathName);
      const collegePlace = typeof place === 'string' ? place : 'india';
      let result;
      if (categoty && clgSubstream) {
        result = await getTopTenCollegesPageData(categoty, clgSubstream, stream);
      } else if (course) {
        result = await getTopCollegesCoursePageData(course, stream, stream);
      } else if (collegeCategory) {
        result = await getTopCollegesCategoryPageData(
          collegeCategory,
          collegePlace?.replace('colleges-in-', ''),
          stream,
          subStream || stream
        );
      } else {
        result = await getTopCollegesPageData(collegePlace?.replace('colleges-in-', ''), stream, subStream || stream);
      }
      result && setPageData(result);
    };
    getData();
  }, [categoty, params]);

  useEffect(() => {
    const getBookMark = async () => {
      if (user?.id) {
        const result = await getStudentBookMark(Number(user.id));
        result?.length && setBookMarkArray([...result.map((bookMark) => bookMark.collegeId)]);
      }
    };
    getBookMark();
  }, [user]);

  return (
    <>
      <Box>
        <ContainerWrapper>
          {matchDownLg && (
            <Box
              sx={{
                position: 'sticky',
                top: '75px',
                background: '#fff',
                zIndex: '800'
              }}
            >
              <ListingTopFilters
                sortHandler={handleSortChange}
                collegeData={topColleges.collegeData}
                searchText={searchText}
                setSearchText={setSearchText}
                count={collegeData.length}
                filterHandler={filterHandler}
                topColleges={topColleges}
                filterState={filterDataState}
                setState={setFilterDataState}
              />
            </Box>
          )}
          {(topColleges?.pageData?.title || pageData?.title) && (
            <TopBanner title={pageData?.title || topColleges?.pageData?.title} readMoreContent={pageData?.contents} />
          )}
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
                {!matchDownLg && (
                  <ListingTopFilters
                    sortHandler={handleSortChange}
                    collegeData={topColleges.collegeData}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    count={collegeData.length}
                    filterHandler={filterHandler}
                    topColleges={topColleges}
                    filterState={filterDataState}
                    setState={setFilterDataState}
                  />
                )}
                {matchDownLg && (
                  <Box mb={2}>
                    <CollegeCount count={collegeData.length} />
                  </Box>
                )}

                {collegeData.length > 0 ? (
                  <ListingPageCards
                    topColleges={topColleges.collegeData}
                    collegeData={collegeData}
                    enableLoadMore={enableLoadMore}
                    disablePagination={disablePagination}
                    bookMarkArray={bookMarkArray}
                    handleUpdateBookMark={handleUpdateBookMark}
                  />
                ) : (
                  <NoDataCard />
                )}
              </Box>
            </Grid>
            <Grid
              item
              xl={4}
              sx={{
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
              }}
            >
              <Box className="stickySidebar">
                <CollegeFilter
                  data={topColleges}
                  filterHandler={filterHandler}
                  filterState={filterDataState}
                  setState={setFilterDataState}
                />
              </Box>
            </Grid>
          </Grid>
        </ContainerWrapper>
      </Box>
    </>
  );
};

export default CollegeListCard;
