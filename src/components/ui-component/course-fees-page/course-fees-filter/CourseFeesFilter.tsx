/* eslint-disable @typescript-eslint/no-explicit-any */
// material-ui
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Box } from '@mui/system';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import { FormControlLabel, FormControl, Typography } from '@mui/material';

import feesFilter from './CourseFeeFilter.module.css';

export type CourseShort = {
  coursesShort: {
    id: number;
    name: string;
    collegeId: number;
    collegeType: number;
  }[];
};

interface ICourseFeeProps {
  courseData?: {
    name: string;
    id: number;
  }[];
  setSelectedCourse: (data: string) => void;
  selectedCourse: string;
}

const CourseFees: React.FC<ICourseFeeProps> = ({ courseData, setSelectedCourse, selectedCourse }) => {
  const [expanded, setExpanded] = useState<string | boolean>('degreePanel');
  const handleOptionChange = (e: any) => {
    setSelectedCourse(e.target.value); // Update the selected course & ID
  };
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className={feesFilter.Section} data-test-id="course-fees-desktop-filter">
      <Box className={feesFilter.Wrapper}>
        <Accordion
          className={feesFilter.CustomAccordions}
          expanded={expanded === 'degreePanel'}
          onChange={handleChange('degreePanel')}
        >
          <AccordionSummary
            className={feesFilter.CustomAccordionSum}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="degreePanelbh-content"
            id="degreePanelbh-header"
          >
            <Typography className={feesFilter.FilterTitle}>Degree</Typography>
          </AccordionSummary>
          <AccordionDetails className={feesFilter.CustomAccordionDetail}>
            <Box className={feesFilter.ScrollContent}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="state" name="state-radio-buttons-group" onChange={handleOptionChange}>
                  {courseData?.map((courseName) => (
                    <FormControlLabel
                      key={courseName?.id}
                      value={courseName.id}
                      control={
                        <Radio
                          checked={courseName.id === Number(selectedCourse)}
                          value={courseName.id}
                          sx={{
                            '&.Mui-checked': {
                              color: '#0B6049'
                            }
                          }}
                        />
                      }
                      className="custom-radio"
                      label={courseName.name}
                      sx={{
                        color: Number(selectedCourse) === courseName.id ? '#0B6049' : '#000'
                      }}
                      data-test-id={`course-fees-filter-${courseName.name}`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default CourseFees;
