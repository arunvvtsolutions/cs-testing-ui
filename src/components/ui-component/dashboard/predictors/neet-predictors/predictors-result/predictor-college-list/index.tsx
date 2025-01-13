/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FilterAlt, Refresh } from '@mui/icons-material';
import sortBy from 'lodash/sortBy';

import CustomeTextField from '../custome-textfield';
import CollegeCard from '../college-card';
import QuotaSelector, { IQuotaDataProps, IQuotaProps } from '../quota-selector';
import { PREDICTOR_RESULT } from '../constant';
import style from '../style.module.css';
import PredictorsClgDetailModal from '../../college-detail-modal';
import { IPrectorBannerProps } from '../../college-detail-modal/predictor-modal-banner';

import { useDispatch, useSelector } from 'store';
import { openFilterDrawer } from 'store/slices/menu';
import { ISelectedFilterPrpos } from 'types/college';
import { needPredictorFilterHanlder, replaceSpecialChar } from 'utils';
import { postStudentBookMark, putStudentBookMark } from 'utils/api/student-dashboard';
import useAuth from 'hooks/useAuth';
import { Stream } from 'types';
import { openSnackbar } from 'store/slices/snackbar';
import { SuccessSnackbar } from 'ui-component/common/snackbar-type';

export interface ICollegeDataProps {
  id: number;
  name: string;
  shortUrl: string;
  shortName: string;
  fees: string;
  quotaId: number;
  state: string;
  city: string;
  seat: number;
  closingRank: number;
  nirfRank: number;
  bookmarked: null | number;
  chance: string;
  collegeType: string;
  hospitalType: string;
  bedCount: number;
  logo: string;
}

const PredictorsCollegeList = ({
  collegeData,
  filterState,
  quotaData
}: {
  collegeData: ICollegeDataProps[];
  filterState: ISelectedFilterPrpos;
  quotaData: IQuotaProps;
}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isDrawerOpen = useSelector((state) => state.menu.filterDrawer);
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [filterdCollegeData, setFilterdCollegeData] = useState<ICollegeDataProps[]>(collegeData);
  const [bookmarkedColleges, setBookmarkedColleges] = useState<ICollegeDataProps[]>([]);
  const [loadMoreLimit, setLoadMoreLimit] = useState(10);
  const [selectedQuota, setSelectedQuota] = useState<IQuotaDataProps>(quotaData.quotaData?.[0] || {});
  const [searchCollege, setSearchCollege] = useState<string>('');
  const [selectedCollege, setSelectedCollege] = useState<IPrectorBannerProps>({
    id: 0,
    collegeName: '',
    image: '',
    city: '',
    state: ''
  });
  const [open, setOpen] = useState(false);

  const handleOpenModel = (collegeData: IPrectorBannerProps) => {
    setSelectedCollege(collegeData);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // college search
  const handleSearch = (value: string) => {
    setSearchCollege(value);
  };

  // quota sort
  const handleSort = (value: IQuotaDataProps) => {
    setSelectedQuota(value);
  };

  // load more
  const handleLoadMore = () => {
    setLoadMoreLimit((prv) => prv + 10);
  };

  //   handle bookmark
  const handleBookmark = async (collegeData: ICollegeDataProps) => {
    const isBookmark = bookmarkedColleges.find((clg) => clg.id === collegeData.id);

    if (isBookmark) {
      setBookmarkedColleges([...bookmarkedColleges.filter((clg) => clg.id !== collegeData.id)]);
      user && (await putStudentBookMark(Number(user.id), collegeData.shortUrl, Stream.MEDICAL));
      dispatch(openSnackbar(SuccessSnackbar('Bookmark removed succesfully')));
    } else {
      setBookmarkedColleges([...bookmarkedColleges, collegeData]);
      user && (await postStudentBookMark(Number(user.id), collegeData.id, Stream.MEDICAL));
      dispatch(openSnackbar(SuccessSnackbar('Bookmark added succesfully')));
    }
  };

  const handleOpenBottomDrawer = () => {
    dispatch(openFilterDrawer(!isDrawerOpen));
  };

  // all type of filter is happening here
  useEffect(() => {
    if (collegeData.length === 0) return;
    const selectedClgValue = searchCollege.replaceAll(' ', '').toLowerCase();
    let filteredColleges = collegeData.filter((clgData) => {
      const isMatchingQuota = selectedQuota.quotaId === 0 || clgData.quotaId === selectedQuota.quotaId;
      const isMatchingCollege =
        clgData.shortName.replaceAll(' ', '').toLowerCase().includes(selectedClgValue) ||
        clgData.name.toLowerCase().replaceAll(' ', '').includes(selectedClgValue);
      return isMatchingQuota && needPredictorFilterHanlder(filterState, clgData) && isMatchingCollege;
    });
    if (filterState.orderBy.id === '1') {
      filteredColleges = [...sortBy(filteredColleges, filterState.sortBy.id)];
    } else {
      filteredColleges = sortBy(filteredColleges, (obj: any) => -parseInt(obj[filterState.sortBy.id], 10));
    }
    setFilterdCollegeData(filteredColleges);
  }, [collegeData, searchCollege, selectedQuota, filterState.collegeType, filterState.hospitalType, filterState.state]);

  // useEffect for sorting
  useEffect(() => {
    if (collegeData.length > 0) {
      setBookmarkedColleges([...collegeData.filter((clg) => clg.bookmarked && clg.bookmarked !== 0)]);
    }
    if (quotaData && quotaData.quotaData?.length > 0) {
      setSelectedQuota(quotaData.quotaData[0]);
    }
  }, [collegeData, quotaData]);

  useEffect(() => {
    let collegeDatas: ICollegeDataProps[] = [];
    if (filterdCollegeData.length > 0) collegeDatas = [...filterdCollegeData];
    else collegeDatas = [];
    if (collegeDatas.length > 0) {
      if (filterState.orderBy.id === '1') {
        // for the fields which having special charector need to be sorted
        collegeDatas = sortBy(collegeDatas, (obj: any) =>
          parseInt(replaceSpecialChar(String(obj[filterState.sortBy.id])), 10)
        );
      } else {
        collegeDatas = sortBy(
          collegeDatas,
          (obj: any) => -parseInt(replaceSpecialChar(String(obj[filterState.sortBy.id])), 10)
        );
      }
      setFilterdCollegeData([...collegeDatas]);
    }
  }, [collegeData, filterState.sortBy, filterState.orderBy]);

  return (
    <>
      <Stack direction="column" spacing={2} width="100%">
        <Box width="100%">
          <Grid container spacing={3} width="100%" ml={0}>
            <Grid item md={8} xs={6} sx={{ paddingLeft: '0px !important' }}>
              <CustomeTextField handleChange={handleSearch} />
            </Grid>
            {!quotaData.hasError && (
              <Grid item md={4} xs={6}>
                <QuotaSelector
                  quotaData={quotaData.quotaData || []}
                  handleChange={handleSort}
                  selectedValue={selectedQuota}
                />
              </Grid>
            )}
          </Grid>
        </Box>
        <Box width="100%">
          <Grid container>
            {filterdCollegeData.length > 0 ? (
              filterdCollegeData
                .slice(0, loadMoreLimit)
                .map((clgData, index) => (
                  <CollegeCard
                    data-test-id={`neet-predictor-college-${clgData}`}
                    key={index}
                    collegeData={clgData}
                    handleBookmark={handleBookmark}
                    bookmarkedColleges={bookmarkedColleges}
                    handleOpenModel={handleOpenModel}
                  />
                ))
            ) : (
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" height="50vh">
                <Typography textAlign="center" fontSize="23px" fontWeight="600">
                  {PREDICTOR_RESULT.NO_COLLEGE_FOUND}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
        {loadMoreLimit < filterdCollegeData.length && (
          <Box className={style.loadMoreBox}>
            <Button startIcon={<Refresh />} className={style.loadMoreBtn} onClick={handleLoadMore}>
              <Typography className={style.loadMoreTxt}>{PREDICTOR_RESULT.LOAD_MORE}</Typography>
            </Button>
          </Box>
        )}
      </Stack>
      {isLgDown && (
        <IconButton
          aria-label="filter"
          className={style.subFilterBtn}
          data-test-id="compare-colleges-count-btn-from-need-predictor"
          sx={{ right: '5%' }}
          onClick={handleOpenBottomDrawer}
        >
          <FilterAlt
            sx={{
              color: '#000 !important',
              fontSize: '25px'
            }}
          />
        </IconButton>
      )}
      <PredictorsClgDetailModal open={open} selectedCollege={selectedCollege} handleClose={handleClose} />
    </>
  );
};

export default PredictorsCollegeList;
