/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Grid, Stack, Typography } from '@mui/material';

import PredictorsCollegeList, { ICollegeDataProps } from './predictor-college-list';
import { PREDICTOR_RESULT, filterKey, orderByData, sortByData } from './constant';
import FilterHead from './filter/filter-head';
import FilterComponent from './filter/filter-component/checkbox-component';
import PredictorInfo from './predictorData';
import FilterRadioComponent from './filter/filter-component/radio-component';
import Loading from './loading';
import { IQuotaProps } from './quota-selector';
import ResultBanner from './banner';
import styles from './style.module.css';

import CustomeDrawer from 'ui-component/common/right-drawer';
import { ScrollFilterContent } from 'ui-component/listing-page/filter/styles';
import { ISelectedFilterPrpos } from 'types/college';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import { getAiqPredictorResult, getQuotaData } from 'utils/api/neet-predictor';
import { useSelector } from 'store';

export interface IStatePredictorProps {
  rank: number;
  stateId: number;
  categoryType: string;
  abled: number;
  seatType?: number;
  Provisional?: number;
  region?: number;
  minority?: string;
  specialQuota?: string;
  gender?: number;
  subCaste?: number;
  belongs?: string;
  GeoBelong?: string;
}
export interface INeetPredResultProps extends IErrorProps {
  neetRank: number;
  collegeData: ICollegeDataProps[];
}

const PredictorsColleges = () => {
  const selectedNeetData = useSelector((state) => state.neetPredictor.neetPredictorFormData);
  const router = useRouter();
  const [predictorResult, setPredictorResult] = useState<INeetPredResultProps>();
  const [quotaData, setQuotaData] = useState<IQuotaProps>({
    quotaData: [],
    hasError: false
  });
  const predictorInfo = new PredictorInfo(predictorResult?.collegeData || []);
  const params = useParams();
  const type = params?.type;

  const [expanded, setExpanded] = useState<string | boolean>(false);
  const [seletedFilterData, setSelectedData] = useState<ISelectedFilterPrpos>({
    collegeType: [],
    hospitalType: [],
    state: [],
    sortBy: sortByData[0],
    orderBy: orderByData[0]
  });

  const handleExpand = (panel: string) => async (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const clearHandler = (contentId?: string, filterType?: string) => {
    if (filterType && contentId) {
      const selectedType = seletedFilterData[filterType];
      Array.isArray(selectedType) &&
        setSelectedData({
          ...seletedFilterData,
          [filterType]: [...selectedType.filter((type) => type.id !== contentId)]
        });
    }
  };
  const clearAllHandler = () => {
    setSelectedData({
      ...seletedFilterData,
      collegeType: [],
      hospitalType: [],
      state: []
    });
  };

  const setSelectedValue = (key: string, value: { id: string; label: string }[]) => {
    setSelectedData({
      ...seletedFilterData,
      [key]: value
    });
  };

  const handleRadioFormChange = (key: string, value: { id: string; label: string }) => {
    setSelectedData({
      ...seletedFilterData,
      [key]: value
    });
  };

  useEffect(() => {
    const getPredictorResult = async () => {
      if (!selectedNeetData.neetRank) router.push('/predictor/neet-predictor-form');
      else if (type) {
        const stateData: IStatePredictorProps = {
          rank: selectedNeetData.neetRank,
          stateId: selectedNeetData.state,
          categoryType: selectedNeetData.stateCategory,
          abled: selectedNeetData.speciallyAbled
        };
        const predictorResult = await getAiqPredictorResult(
          type,
          selectedNeetData.neetRank,
          selectedNeetData.indiaCategory,
          selectedNeetData.speciallyAbled,
          stateData
        );
        const quotaResult = await getQuotaData(
          PREDICTOR_RESULT.AIQ_PATH ? selectedNeetData.indiaCategory : selectedNeetData.stateCategory,
          selectedNeetData.speciallyAbled
        );
        setQuotaData(quotaResult);
        setPredictorResult(predictorResult);
      }
    };
    getPredictorResult();
  }, [type]);

  useEffect(() => {
    if (predictorResult && predictorResult?.collegeData.length > 0) {
      predictorInfo.updateFilterData(predictorResult.collegeData || []);
    }
  }, [predictorResult]);

  return (
    <CustomeDrawer
      drawerContent={
        <ScrollFilterContent width="100%" sx={{ padding: '16px 20px' }}>
          <FilterHead clearAllHandler={clearAllHandler} clearHandler={clearHandler} selectedDatas={seletedFilterData} />
          <FilterComponent
            filterKey={filterKey.COLLEGE_TYPE}
            filterData={predictorInfo.getFilterData(filterKey.COLLEGE_TYPE)}
            expanded={expanded}
            handleExpand={handleExpand}
            label={PREDICTOR_RESULT.COLLEGE_TYPE}
            selectedValues={seletedFilterData.collegeType}
            setSelectedValue={setSelectedValue}
          />
          <FilterComponent
            filterKey={filterKey.HOSPITAL_TYPE}
            filterData={predictorInfo.getFilterData(filterKey.HOSPITAL_TYPE)}
            expanded={expanded}
            handleExpand={handleExpand}
            label={PREDICTOR_RESULT.HOSPITAL_TYPE}
            selectedValues={seletedFilterData.hospitalType}
            setSelectedValue={setSelectedValue}
          />
          <FilterComponent
            filterKey={filterKey.STATE}
            filterData={predictorInfo.getFilterData(filterKey.STATE)}
            expanded={expanded}
            handleExpand={handleExpand}
            label={PREDICTOR_RESULT.STATE}
            selectedValues={seletedFilterData.state}
            setSelectedValue={setSelectedValue}
          />
          <FilterRadioComponent
            filterKey={filterKey.SORTBY}
            filterData={sortByData}
            expanded={expanded}
            handleExpand={handleExpand}
            label={PREDICTOR_RESULT.SORTBY}
            selectedValues={seletedFilterData.sortBy}
            setSelectedValue={handleRadioFormChange}
          />
          <FilterRadioComponent
            filterKey={filterKey.ORDERBY}
            filterData={orderByData}
            expanded={expanded}
            handleExpand={handleExpand}
            label={PREDICTOR_RESULT.ORDERBY}
            selectedValues={seletedFilterData.orderBy}
            setSelectedValue={handleRadioFormChange}
          />
        </ScrollFilterContent>
      }
      title={PREDICTOR_RESULT.FILTER_TITLE}
    >
      {predictorResult?.hasError ? (
        <ErrorComponent />
      ) : predictorResult?.collegeData ? (
        <Grid
          container
          spacing={2}
          width="100%"
          justifyContent="center"
          sx={{ paddingY: { xs: 0, sm: 3 }, marginLeft: '0px' }}
        >
          <Grid item xs={12} display="flex" justifyContent="center" className={styles.bannerGrid}>
            <ResultBanner neetRank={predictorResult.neetRank} />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            sx={{ padding: '0px' }}
            className="dashBoard_Container"
          >
            <Stack direction="column" width="100%" justifyContent="center" alignItems="center" maxWidth="700px">
              <Grid item mb={4} xs={12} width="100%">
                <Typography className={styles.title}>{PREDICTOR_RESULT.PREDICTOR_TITLE}</Typography>
              </Grid>
              <PredictorsCollegeList
                collegeData={predictorResult?.collegeData}
                filterState={seletedFilterData}
                quotaData={quotaData}
              />
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </CustomeDrawer>
  );
};

export default PredictorsColleges;
