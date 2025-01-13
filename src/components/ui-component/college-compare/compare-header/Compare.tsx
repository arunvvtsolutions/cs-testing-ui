/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { Box, Typography, useMediaQuery, useTheme, Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import styles from './Compare.module.css';

import { IChangedCollegeProps } from '.';

import { postAddCompareHistory } from 'utils/api/compare-college';
import { findStream } from 'utils';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'store';
import { updateComparingColleges } from 'store/slices/student-profile';

interface IcompareProps {
  id: number;
  imageUrl: string;
  collegeName: string;
  shortName: string;
  shortUrl: string;
  collegeShortName: string;
}

interface ICompareDataProps {
  // compareData: IcompareProps[];
  CollegeData: IcompareProps[];
  setChangedCollege?: (changedCollege: IChangedCollegeProps[]) => void;
  changedCollege?: IChangedCollegeProps[];
}

interface ISelectedCollege {
  [key: string]: IcompareProps | null;
}

const CollegeCompare: React.FC<ICompareDataProps> = ({ CollegeData, setChangedCollege, changedCollege }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const scrollBoxRef = useRef(null);
  const mediaQueryPoint = useMediaQuery(theme.breakpoints.down('lg'));
  const [selectedColleges, setSelectedColleges] = useState<ISelectedCollege>({});
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [compareData, setCompareData] = useState<IcompareProps[]>([]);
  const [activeTimer, setActiveTimer] = useState(false);
  const limit = mediaQueryPoint ? 2 : compareData.length;
  const params = useParams();

  const handleAutocompleteChange = (
    event: SyntheticEvent<Element, Event>,
    value: IcompareProps | null,
    collegeId: number,
    index: number
  ) => {
    setSelectedColleges((prevState) => ({
      ...prevState,
      [collegeId]: value
    }));
    if (value) {
      const newCompareData = [...compareData];
      newCompareData[index] = value;
      setCompareData(newCompareData);
    }
    if (value && setChangedCollege && changedCollege) {
      const newSelectedColleges = [...changedCollege];
      setChangedCollege([
        ...newSelectedColleges.map((clg) => {
          if (clg.position === index) {
            return { position: index, ...value };
          } else return clg;
        })
      ]);
      setActiveTimer(true);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (scrollBoxRef.current) {
        const rect = (scrollBoxRef.current as HTMLElement).getBoundingClientRect();
        const isAtTop = rect.top <= 48;
        setIsSticky(isAtTop && window.scrollY > rect.bottom);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    // Set default values for selectedColleges
    const defaultValues: ISelectedCollege = {};
    compareData.slice(0, limit).forEach((data) => {
      defaultValues[data.id] = CollegeData.find((college) => college.id === data.id) || null;
    });
    setSelectedColleges(defaultValues);
  }, [compareData, CollegeData, limit]);

  useEffect(() => {
    if (params && CollegeData.length) {
      const { collegeone, collegetwo, collegethree } = params;
      const collegeShortNames = [collegeone, collegetwo, collegethree?.[0]];
      const compareColleges = collegeShortNames.map((shortName) =>
        CollegeData.find((clg) => clg.shortName === shortName)
      );

      const selectedCollegesArray: IChangedCollegeProps[] = [];

      if (changedCollege && setChangedCollege) {
        compareColleges.forEach((clg, i) => {
          clg && selectedCollegesArray.push({ position: i, ...clg });
        });
        setChangedCollege([...selectedCollegesArray]);
      }
      setCompareData([...compareColleges.filter((data): data is IcompareProps => data !== undefined)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, CollegeData]);

  // trigger the API call only if the user has stayed on an option for at least 5 seconds
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any;
    clearTimeout(timer);
    if (changedCollege && activeTimer) {
      timer = setTimeout(async () => {
        const { stream } = findStream(window.location.host);
        const selectedCollegeIds = changedCollege?.map((clg) => clg.id);

        if (selectedCollegeIds?.length && user?.id) {
          const postHistoryData = {
            userId: Number(user.id),
            stream,
            collegeIds: selectedCollegeIds.map((id) => id.toString())
          };
          await postAddCompareHistory(postHistoryData);
        }
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [changedCollege]);

  useEffect(() => {
    dispatch(updateComparingColleges([]));
  }, []);
  return (
    <>
      <Grid container spacing={2} className={styles.customGridContainer}>
        {(changedCollege || compareData).slice(0, limit).map((data, index) => (
          <Grid key={index} item lg={4} md={6} xs={6} style={{ padding: '0px' }}>
            <Box className={styles.logoBox} data-test-id={`college-compare-logo${data.shortName}`}>
              <Image
                src={`/assets/images/cs/${data.imageUrl ? data.imageUrl : 'campus.webp'}`}
                alt={data.shortName}
                width={56}
                height={56}
              />
            </Box>
            <Box className={`dashBoard_h5 ${styles.shortNameBox}`}>
              <Typography>{data.collegeShortName}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box ref={scrollBoxRef} className={`${styles.gridBox} ${isSticky ? styles.active : ''}`}>
        <Grid container className={styles.customGridContainer}>
          {(changedCollege || compareData).slice(0, limit).map((data, index) => (
            <Grid
              key={index}
              item
              lg={4}
              md={6}
              xs={6}
              data-test-id={`college-compare-select-dropdown${data.shortName}`}
              className={styles.gridBoxCols}
            >
              <Box>
                <Autocomplete
                  className={`dashBoardListText ${styles.collegeNameSelect}`}
                  value={selectedColleges[data.id]}
                  defaultValue={data}
                  onChange={(event, value) => handleAutocompleteChange(event, value, data.id, index)}
                  options={CollegeData || []}
                  noOptionsText="No Colleges Found"
                  getOptionDisabled={(option: IcompareProps) =>
                    Object.values(selectedColleges).some((college) => college?.id === option.id) ||
                    (data.id === option.id && Object.values(selectedColleges).length === 0)
                  }
                  getOptionLabel={(option: IcompareProps) => option.collegeName}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth placeholder="Please select college" />
                  )}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CollegeCompare;
