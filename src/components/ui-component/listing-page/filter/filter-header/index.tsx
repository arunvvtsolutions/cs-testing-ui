/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from '@mui/material';

import { Wrapper, FilterContentbx, FilterText } from '../styles';

import FilterObject from './filterContent';
import ClearAll from './clearAll';

import { IFilterData } from 'types/college';

const FilterHeader = ({
  selectedFilter,
  clearAllSelectedState,
  clearStateHandler,
  clearCityHandler,
  clearOwnershipHandler,
  clearCategoryHandler,
  clearCoursesHandler
}: {
  selectedFilter: IFilterData;
  clearAllSelectedState: () => void;
  clearStateHandler: (state: string) => void;
  clearCityHandler: (city: string) => void;
  clearOwnershipHandler: (ownership: string) => void;
  clearCategoryHandler: (category: string) => void;
  clearCoursesHandler: (course: string) => void;
}) => {
  const isAnyOptionSelected =
    selectedFilter.state.length > 0 ||
    selectedFilter.city.length > 0 ||
    selectedFilter.ownership.length > 0 ||
    selectedFilter.category.length > 0 ||
    selectedFilter.course.length > 0;

  return (
    <>
      <Wrapper data-test-id="listing-page-filter-header">
        <FilterContentbx>
          <FilterText>Filter</FilterText>
        </FilterContentbx>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {selectedFilter.state &&
            selectedFilter.state.map((content: any, index: number) => {
              return (
                <FilterObject
                  key={content + index}
                  content={content.label}
                  clearFilterHandler={() => {
                    clearStateHandler(content.id);
                  }}
                />
              );
            })}
          {selectedFilter.city &&
            selectedFilter.city.map((content: any, index: number) => {
              return (
                <FilterObject
                  key={content + index}
                  content={content.label}
                  clearFilterHandler={() => clearCityHandler(content.id)}
                />
              );
            })}
          {selectedFilter.ownership &&
            selectedFilter.ownership.map((content: any, index: number) => {
              return (
                <FilterObject
                  key={content + index}
                  content={content.label}
                  clearFilterHandler={() => clearOwnershipHandler(content.id)}
                />
              );
            })}
          {selectedFilter.course &&
            selectedFilter.course.map((content: any, index: number) => {
              return (
                <FilterObject
                  key={content + index}
                  content={content.label}
                  clearFilterHandler={() => clearCoursesHandler(content.id)}
                />
              );
            })}
          {selectedFilter.category &&
            selectedFilter.category.map((content: any, index: number) => {
              return (
                <FilterObject
                  key={content + index}
                  content={content.label}
                  clearFilterHandler={() => clearCategoryHandler(content.id)}
                />
              );
            })}
          {isAnyOptionSelected && <ClearAll title="Clear All" clearAllSelectedState={clearAllSelectedState} />}
        </Box>
      </Wrapper>
    </>
  );
};

export default FilterHeader;
