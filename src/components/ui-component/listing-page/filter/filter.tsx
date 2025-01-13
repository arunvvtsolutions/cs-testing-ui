import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, FormControl, InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';

import { FilterKeysConstants } from '../college-card/constant';

import { ScrollContent, Wrapper, FilterTitle } from './styles';
import CheckboxList from './chekboxList';

import ICheckboxItem, { IFilterData } from 'types/college';
import { replaceSpecialChar } from 'utils';

type SelectedDataProps = {
  id: string;
  label: string;
  depended?: string;
};
type FilterComponentProps = {
  setSelectedValue: (key: keyof IFilterData, value: SelectedDataProps[]) => void;
  filterKey: keyof IFilterData;
  filterData: ICheckboxItem[];
  expanded: string | boolean;
  handleExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  label: string;
  selectedValues: SelectedDataProps[];
  searchCourse?: string;
  setSearchCourse?: (searchTxt: string) => void;
};

const FilterComponent = ({
  setSelectedValue,
  filterKey,
  filterData,
  expanded,
  handleExpand,
  label,
  selectedValues,
  searchCourse,
  setSearchCourse
}: FilterComponentProps) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<SelectedDataProps[]>([]);
  const [data, setData] = useState<ICheckboxItem[]>(filterData);

  const handleCheckboxChange = (checkboxId: string, checked: boolean, checkboxLabel: string, depended?: string) => {
    if (checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, { id: checkboxId, label: checkboxLabel }]);
      setSelectedValue(filterKey, [...selectedCheckboxes, { id: checkboxId, label: checkboxLabel, depended }]);
    } else {
      const prevSelection = [...selectedCheckboxes];
      const newSelection = prevSelection.filter((id) => id.id !== checkboxId);
      setSelectedCheckboxes(newSelection);
      setSelectedValue(filterKey, newSelection);
    }
  };

  // const handleCourseFilter = (value: string) => {
  //   const courseData = [
  //     ...filterData.filter((course) => {
  //       return replaceSpecialChar(course.label).includes(replaceSpecialChar(value));
  //     })
  //   ];
  //   setData(courseData);
  // };

  useEffect(() => {
    setSelectedCheckboxes(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    if (searchCourse) {
      const courseData = [
        ...filterData.filter((course) => {
          return replaceSpecialChar(course.label).includes(replaceSpecialChar(searchCourse));
        })
      ];
      setData(courseData);
    } else setData(filterData);
  }, [searchCourse, filterData]);

  return (
    <>
      <Wrapper data-test-id="listing-page-filter-accordion">
        <Accordion
          expanded={expanded === filterKey}
          onChange={handleExpand(String(filterKey))}
          style={{
            marginBottom: '15px'
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${String(filterKey)}bh-content`}
            id={`${String(filterKey)}bh-header`}
            sx={{
              background: expanded === filterKey ? 'rgba(223, 225, 230, 0.20)' : '#FFF',
              border: '1px solid #DFE1E6;'
            }}
          >
            <FilterTitle>{label}</FilterTitle>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              border: '1px solid #DFE1E6',
              background: ' #FFF',
              boxShadow: '16px 0px 64px 0px rgba(0, 0, 0, 0.04)'
            }}
          >
            {filterKey === FilterKeysConstants.COURSE && setSearchCourse && (
              <Box>
                <TextField
                  fullWidth
                  onChange={(e) => setSearchCourse(e.target.value)}
                  sx={{
                    '.MuiOutlinedInput-root': {
                      padding: '0px !important'
                    },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        border: '0.5px solid #D4E0E8'
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: '14px' }}>
                        <Image src="/assets/images/icons/search.svg" width={20} height={20} alt="Search-icon" />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            )}
            <ScrollContent>
              <FormControl component="fieldset">
                {data && data.length > 0 ? (
                  <CheckboxList
                    data={data}
                    onCheckboxChange={handleCheckboxChange}
                    selectedValues={selectedValues}
                    filterKey={filterKey}
                  />
                ) : (
                  <span>{`No ${filterKey} data`}</span>
                )}
              </FormControl>
            </ScrollContent>
          </AccordionDetails>
        </Accordion>
      </Wrapper>
    </>
  );
};

export default FilterComponent;
