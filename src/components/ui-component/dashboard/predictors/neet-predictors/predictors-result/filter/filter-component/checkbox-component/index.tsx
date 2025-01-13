import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';

import ICheckboxItem from 'types/college';
import CheckboxList from 'ui-component/listing-page/filter/chekboxList';
import { FilterTitle, ScrollContent, Wrapper } from 'ui-component/listing-page/filter/styles';

type SelectedDataProps = {
  id: string;
  label: string;
};

interface IFilterDataProps {
  setSelectedValue: (key: string, value: SelectedDataProps[]) => void;
  filterKey: string;
  filterData: ICheckboxItem[];
  expanded: string | boolean;
  handleExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  label: string;
  selectedValues: SelectedDataProps[];
}

const FilterComponent = ({
  setSelectedValue,
  filterKey,
  filterData,
  expanded,
  handleExpand,
  label,
  selectedValues
}: IFilterDataProps) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<SelectedDataProps[]>([]);

  const handleCheckboxChange = (checkboxId: string, checked: boolean, checkboxLabel: string) => {
    if (checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, { id: checkboxId, label: checkboxLabel }]);
      setSelectedValue(filterKey, [...selectedCheckboxes, { id: checkboxId, label: checkboxLabel }]);
    } else {
      const prevSelection = [...selectedCheckboxes];
      const newSelection = prevSelection.filter((id) => id.id !== checkboxId);
      setSelectedCheckboxes(newSelection);
      setSelectedValue(filterKey, newSelection);
    }
  };

  useEffect(() => {
    setSelectedCheckboxes(selectedValues);
  }, [selectedValues]);
  return (
    <Wrapper data-test-id="neet-predictor-result-filter-accordion">
      <Accordion
        expanded={expanded === filterKey}
        onChange={handleExpand(String(filterKey))}
        style={{
          marginBottom: '15px'
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={`${String(filterKey)}bh-content`}
          id={`${String(filterKey)}bh-header`}
          sx={{
            background: expanded === filterKey ? 'rgba(223, 225, 230, 0.20)' : '#FFF',
            border: '1px solid #DFE1E6;',
            borderRadius: '4px',
            '&.Mui-expanded': {
              borderRadius: '4px 4px 0 0 !important'
            }
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
          <ScrollContent>
            <FormControl component="fieldset">
              {filterData && filterData.length > 0 ? (
                <CheckboxList
                  data={filterData}
                  onCheckboxChange={handleCheckboxChange}
                  selectedValues={selectedValues}
                />
              ) : (
                <span>{`No ${filterKey} data`}</span>
              )}
            </FormControl>
          </ScrollContent>
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  );
};

export default FilterComponent;
