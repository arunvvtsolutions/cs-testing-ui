/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Box } from '@mui/system';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import { FormControlLabel, FormControl, Typography } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { CourseContent } from './constant';

import feesFilter from 'ui-component/course-fees-page/course-fees-filter/CourseFeeFilter.module.css';
import { ISubMenuProps } from 'ui-component/subheader';
import { IInnerPageParams, Stream } from 'types';

interface ICourseDetailsProps {
  menuId: number;
  menuName: string;
}

const CourseDetailsDesktop: React.FC<ISubMenuProps> = ({ subMenu }) => {
  const router = useRouter();
  const asPath = usePathname();
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;
  const courseName = params?.courseName;
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [disableCutoff, setDisableCutoff] = useState<boolean>(true);

  const courseDetails: ICourseDetailsProps[] = [
    {
      menuId: 1,
      menuName: 'overview'
    },
    {
      menuId: 2,
      menuName: 'fees-structure'
    },
    {
      menuId: 6,
      menuName: 'cutoff'
    },
    {
      menuId: 11,
      menuName: 'question-answer'
    }
  ];

  const courseDetailsContent: string[] = ['Overview', 'Fees Structure', 'Cutoff', 'Q&A'];

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paths: Record<string, string> = {
      overview: 'overview',
      'fees-structure': 'fees-structure',
      cutoff: 'cutoff',
      'question-answer': 'question-answer'
    };

    if (paths[e.target.value]) {
      setSelectedCourse(e.target.value);
      router.push(`/${ins}/${name}/course-fees/${courseName}/${paths[e.target.value]}`);
    }
  };
  // const segments = asPath?.split('/');
  useEffect(() => {
    const segments = asPath?.split('/');
    const lastSegment = segments?.[segments.length - 1];
    lastSegment && setSelectedCourse(lastSegment);
  }, [asPath]);

  // for checking the cutoff is there or not
  useEffect(() => {
    if (name && courseName) {
      const getData = async () => {
        const res = await fetch(`/api/filterdata-api?courseName=${courseName}&collegeUrl=${name}`);
        const { filteredData, cutoff } = await res.json();

        for (const i in filteredData) {
          if (filteredData[i].length > 0) setDisableCutoff(false);
        }
        setDisableCutoff(cutoff?.results.length <= 0);
      };
      getData();
    }
  }, []);

  return (
    <>
      <Box className={feesFilter.Section} paddingBottom={'12px'}>
        <Box className={feesFilter.Wrapper}>
          <Accordion
            className={feesFilter.CustomAccordions}
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            style={{
              marginBottom: '15px'
            }}
            data-test-id="course-fees-inner-sidebar-accordian"
          >
            <AccordionSummary
              className={feesFilter.CustomAccordionSum}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="openPanelbh-content"
              id="openPanelbh-header"
            >
              <Typography className={feesFilter.FilterTitle}>{CourseContent.COURSE_DETAILS}</Typography>
            </AccordionSummary>
            <AccordionDetails className={feesFilter.CustomAccordionDetail}>
              <Box className={feesFilter.ScrollContent}>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="state" name="state-radio-buttons-group" onChange={handleOptionChange}>
                    {courseDetails.map((pageName, index) => {
                      return (
                        <>
                          {subMenu?.length
                            ? !subMenu?.some((menu) => menu.menuId === pageName.menuId) &&
                              !(
                                pageName.menuName === 'cutoff' &&
                                (window.location.host.includes(Stream.MEDICAL) || disableCutoff)
                              ) && (
                                <FormControlLabel
                                  key={index}
                                  value={pageName.menuName}
                                  control={
                                    <Radio
                                      sx={{
                                        '&.Mui-checked': {
                                          color: '#0B6049'
                                        }
                                      }}
                                      checked={selectedCourse.includes(pageName.menuName)}
                                    />
                                  }
                                  className="custom-radio"
                                  label={courseDetailsContent[index]}
                                  sx={{
                                    color: selectedCourse === pageName.menuName ? '#0B6049' : '#000'
                                  }}
                                  data-test-id={`course-fees-inner-sidebar-${courseDetailsContent[index]}`}
                                />
                              )
                            : !(
                                pageName.menuName === 'cutoff' &&
                                (window.location.host.includes(Stream.MEDICAL) || disableCutoff)
                              ) && (
                                <FormControlLabel
                                  key={index}
                                  value={pageName.menuName}
                                  control={
                                    <Radio
                                      sx={{
                                        '&.Mui-checked': {
                                          color: '#0B6049'
                                        }
                                      }}
                                      checked={selectedCourse.includes(pageName.menuName)}
                                    />
                                  }
                                  className="custom-radio"
                                  label={courseDetailsContent[index]}
                                  sx={{
                                    color: selectedCourse === pageName.menuName ? '#0B6049' : '#000'
                                  }}
                                  data-test-id={`course-fees-inner-sidebar-${courseDetailsContent[index]}`}
                                />
                              )}
                        </>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default CourseDetailsDesktop;
