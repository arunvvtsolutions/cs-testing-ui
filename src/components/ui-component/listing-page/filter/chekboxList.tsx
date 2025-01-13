import React, { useEffect, useState } from 'react';
import { FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import _ from 'lodash';

import { FilterKeysConstants } from '../college-card/constant';

import CheckboxItem, { IFilterData, SelelctedProps } from 'types/college';

interface CheckboxListProps {
  data: CheckboxItem[];
  onCheckboxChange: (checkboxId: string, checked: boolean, checkboxLabel: string, depended?: string) => void;
  selectedValues: SelelctedProps[];
  filterKey?: keyof IFilterData;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ data, onCheckboxChange, selectedValues, filterKey }) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>(data);

  const handleCheckboxChange = (checkboxId: string, checkboxLabel: string, depended?: string) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );

    const checkbox = checkboxes.find((checkbox) => checkbox.id === checkboxId);

    if (checkbox) {
      onCheckboxChange(checkbox.id, !checkbox.checked, checkboxLabel, depended);
    }
  };

  // const capitalizeFirstLetter = (str: string) => {
  //   if (!str) return str;
  //   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  // };

  useEffect(() => {
    const newData = data.map((s) => ({
      ...s,
      checked: selectedValues.some((val) => val.id === s.id)
    }));
    setCheckboxes(newData);
  }, [selectedValues, data]);
  return (
    <FormGroup>
      {checkboxes.map(
        (checkbox: CheckboxItem, index: number) =>
          checkbox.label && (
            <FormControlLabel
              key={index}
              value={checkbox.label}
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: '#0B6049' } }}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange(checkbox.id, checkbox.label, checkbox.depended)}
                  data-test-id={`listing-page-filter-${checkbox.id}`}
                />
              }
              className="custom-radio"
              label={filterKey === FilterKeysConstants.CATEGORY ? checkbox.label : _.capitalize(checkbox.label)}
              sx={{
                color: checkbox.checked ? '#0B6049' : '#000'
              }}
            />
          )
      )}
    </FormGroup>
  );
};

export default CheckboxList;
