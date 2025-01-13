import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Box } from '@mui/system';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import { FormControlLabel, FormControl, Typography } from '@mui/material';

import feesFilter from 'ui-component/course-fees-page/course-fees-filter/CourseFeeFilter.module.css';

interface IFilterDataProps {
  id: string;
  label: string;
  checked: boolean;
}

interface IRadioOptionFilterProps {
  filterData: IFilterDataProps[];
  setSelectedValue: (data: string, key: string) => void;
  selectedValues: string;
  filterKey: string;
  label: string;
  expand: string;
}

const RadioOptionFilter: React.FC<IRadioOptionFilterProps> = ({
  filterData,
  selectedValues,
  setSelectedValue,
  filterKey,
  label,
  expand
}) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(filterKey, e.target.value);
  };

  return (
    <Box data-test-id="course-fees-inner-cutoff-radio-filter">
      <Box className={feesFilter.Section} paddingBottom={'12px'}>
        <Box className={feesFilter.Wrapper}>
          <Accordion
            className={feesFilter.CustomAccordions}
            expanded={expanded === expand}
            onChange={handleChange(expand)}
            style={{ marginBottom: '15px' }}
          >
            <AccordionSummary
              className={feesFilter.CustomAccordionSum}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="openPanelbh-content"
              id="openPanelbh-header"
            >
              <Typography className={feesFilter.FilterTitle}>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails className={feesFilter.CustomAccordionDetail}>
              <Box className={feesFilter.ScrollContent}>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="state" name="state-radio-buttons-group" onChange={handleChangeFilter}>
                    {filterData.map((data: IFilterDataProps, index: number) => (
                      <FormControlLabel
                        key={index}
                        value={data.label}
                        control={
                          <Radio
                            sx={{
                              '&.Mui-checked': {
                                color: '#0B6049'
                              }
                            }}
                            checked={data.label.toLowerCase() === selectedValues.toLowerCase()}
                          />
                        }
                        className="custom-radio"
                        label={data.label}
                        sx={{
                          color: selectedValues === data.label ? '#0B6049' : '#000'
                        }}
                        data-test-id={`course-fees-inner-cutoff-radio-filter-${data.label}`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default RadioOptionFilter;
