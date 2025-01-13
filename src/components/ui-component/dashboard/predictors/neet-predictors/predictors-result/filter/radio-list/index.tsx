import React, { useEffect, useState } from 'react';
import { FormGroup, FormControlLabel, Radio } from '@mui/material';

import CheckboxItem, { SelelctedProps } from 'types/college';

interface CheckboxListProps {
  data: CheckboxItem[];
  onCheckboxChange: (checkboxData: CheckboxItem) => void;
  selectedValues: SelelctedProps;
}

const RadioList: React.FC<CheckboxListProps> = ({ data, onCheckboxChange, selectedValues }) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>(data);

  const handleCheckboxChange = (checkboxData: CheckboxItem) => {
    onCheckboxChange(checkboxData);
    const newValues = checkboxes.map((data) => {
      if (data.id === checkboxData.id) {
        return {
          ...data,
          checked: true
        };
      } else {
        return {
          ...data,
          checked: false
        };
      }
    });
    setCheckboxes(newValues);
  };

  useEffect(() => {
    if (data.length > 0) {
      const newValue = data.map((dt) => {
        if (dt.id === selectedValues.id) {
          return {
            ...dt,
            checked: true
          };
        }
        return dt;
      });
      setCheckboxes(newValue);
    }
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
                <Radio
                  sx={{ '&.Mui-checked': { color: '#0B6049' } }}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange(checkbox)}
                  data-test-id={`neet-predictor-filter-${checkbox.id}`}
                />
              }
              className="custom-radio"
              label={checkbox.label}
              sx={{
                color: checkbox.checked ? '#0B6049' : '#000'
              }}
            />
          )
      )}
    </FormGroup>
  );
};

export default RadioList;
