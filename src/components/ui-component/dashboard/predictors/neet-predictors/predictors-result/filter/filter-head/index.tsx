import { Box } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import { PREDICTOR_RESULT, filterKey } from '../../constant';

import SelectedContent from './filterContent';

import { ISelectedFilterPrpos } from 'types/college';
import ClearAllFilters from 'ui-component/listing-page/filter/filter-header/clearAll';
import { Wrapper } from 'ui-component/listing-page/filter/styles';

interface IFilterHeadProps {
  clearHandler: (content?: string, type?: string) => void;
  clearAllHandler: () => void;
  selectedDatas: ISelectedFilterPrpos;
}

const FilterHead: FC<IFilterHeadProps> = ({ clearAllHandler, clearHandler, selectedDatas }) => {
  const [isOptionSelected, setOptionSelected] = useState(false);
  useEffect(() => {
    if (selectedDatas.collegeType.length > 0 || selectedDatas.hospitalType.length > 0 || selectedDatas.state.length > 0)
      setOptionSelected(true);
    else setOptionSelected(false);
  }, [selectedDatas.collegeType, selectedDatas.hospitalType, selectedDatas.state]);
  return (
    <Wrapper data-test-id="listing-page-filter-header">
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {selectedDatas.collegeType.map((clgType, index) => {
          return (
            <SelectedContent
              clearFilterHandler={clearHandler}
              content={clgType.label}
              contentId={clgType.id}
              key={index}
              type={filterKey.COLLEGE_TYPE}
            />
          );
        })}
        {selectedDatas.hospitalType.map((hptlType, index) => {
          return (
            <SelectedContent
              clearFilterHandler={clearHandler}
              content={hptlType.label}
              key={index}
              contentId={hptlType.id}
              type={filterKey.HOSPITAL_TYPE}
            />
          );
        })}
        {selectedDatas.state.map((state, index) => {
          return (
            <SelectedContent
              clearFilterHandler={clearHandler}
              content={state.label}
              key={index}
              contentId={state.id}
              type={filterKey.STATE}
            />
          );
        })}
        {[selectedDatas.sortBy].map((clgType, index) => {
          return (
            <SelectedContent
              hidCloseIcon
              clearFilterHandler={clearHandler}
              content={clgType.label}
              key={index}
              type={filterKey.SORTBY}
              contentId={clgType.id}
            />
          );
        })}
        {[selectedDatas.orderBy].map((clgType, index) => {
          return (
            <SelectedContent
              hidCloseIcon
              clearFilterHandler={clearHandler}
              content={clgType.label}
              key={index}
              type={filterKey.ORDERBY}
              contentId={clgType.id}
            />
          );
        })}
        {isOptionSelected && (
          <ClearAllFilters title={PREDICTOR_RESULT.CLEAR_ALL} clearAllSelectedState={clearAllHandler} />
        )}
      </Box>
    </Wrapper>
  );
};

export default FilterHead;
