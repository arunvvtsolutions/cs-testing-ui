/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useMediaQuery, useTheme } from '@mui/material';

import { FormItems, IconForCheckBox } from './styles';
import { ListingCardTitles, ModalConstants } from './constant';

import { ICollege } from 'types/college';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';
import { updateComparingColleges } from 'store/slices/student-profile';

export interface ICompareCheckBoxProps {
  compareColleges: ICollege[];
  college: ICollege;
  setCompareColleges: (colleges: ICollege[]) => void;
}

const CheckboxForCompare: React.FC<ICompareCheckBoxProps> = ({ compareColleges, college, setCompareColleges }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (value: ICollege) => {
    if (!compareColleges.some((clg) => clg.shortUrl.includes(college.shortUrl))) {
      if ((compareColleges.length < 3 && !isMdDown) || (isMdDown && compareColleges.length < 2)) {
        setCompareColleges([...compareColleges, value]);
      } else dispatch(openSnackbar(ErrorSnackbar(ModalConstants.SELECTEDMAXCOLLEGE)));
    } else {
      setCompareColleges([...compareColleges.filter((clg) => clg.shortUrl !== value.shortUrl)]);
    }
  };

  useEffect(() => {
    dispatch(updateComparingColleges(compareColleges));
  }, [compareColleges]);

  return (
    <FormItems
      control={
        <Checkbox
          checked={compareColleges.some((clg) => clg.shortUrl.includes(college.shortUrl))}
          value={college}
          onChange={() => handleChange(college)}
          checkedIcon={<IconForCheckBox />}
          data-test-id="listing-page-card-compare"
        />
      }
      label={ListingCardTitles.ADD_TO_COMPARE}
    />
  );
};

export default CheckboxForCompare;
