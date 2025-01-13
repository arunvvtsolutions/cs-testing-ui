import { Box, Button, FormControl, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import styles from './profileBanner.module.css';
import { ProfileBannerContent } from './constant';
interface ICollegeDataProps {
  collegeId: number;
  name: string;
  shortUrl: string;
  shortName: string;
}

interface IBannerProps {
  collegeData?: ICollegeDataProps[];
  showDropDown?: boolean;
  value: string | number;
  formHeading: string;
  placeHolder: string;
  formSubTitle?: string;
  errorMessage?: string;
  handleChange?: (data: string | number) => void;
  handleSelect?: (e: string | number, shortUrl?: string) => void;
}

const BannerForm: React.FC<IBannerProps> = ({
  collegeData,
  showDropDown,
  handleSelect,
  value,
  formHeading,
  placeHolder,
  handleChange,
  formSubTitle,
  errorMessage = 'Value is required'
}) => {
  const [selectedCollege, setSelectedCollege] = useState<ICollegeDataProps>();
  const [searchText, setSearchText] = useState('');
  const [onFocus, setOnFocus] = useState(false);

  //validation form schema
  const validationSchema = Yup.object({
    selectedValue: Yup.mixed().test('required', errorMessage, function (value) {
      if (value === 0) {
        return this.createError({
          message: errorMessage,
          path: 'selectedValue'
        });
      }
      return true;
    })
  });

  const formik = useFormik({
    initialValues: {
      selectedValue: 0
    },
    validationSchema,
    onSubmit: (values) => {
      showDropDown && handleSelect
        ? handleSelect(values.selectedValue, selectedCollege?.shortUrl)
        : handleChange && handleChange(values.selectedValue);
    }
  });

  return (
    <Box>
      <Box className={styles.formSection} data-test-id="college-iq-form">
        <Box className={styles.formTitleWrapper}>
          <Typography className={styles.formTitle}>{formHeading}</Typography>
        </Box>
        {showDropDown && (
          <Box className={styles.itemWrapper}>
            <Typography className={`dashBoardListText ${styles.formItemHeading}`}>
              {formSubTitle ? formSubTitle : ProfileBannerContent.INSTITUTE_NAME}
            </Typography>
          </Box>
        )}
        <FormControl fullWidth onSubmit={formik.handleSubmit} component={'form'}>
          {/* custom Search DropDown  below */}

          <>
            {showDropDown && collegeData ? (
              <Box className={styles.customSearch}>
                <Box className={styles.customSearchHead} onClick={() => setOnFocus(!onFocus)}>
                  <input
                    type="text"
                    placeholder="Select college"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      if (e.target.value && !onFocus) setOnFocus(true);
                    }}
                  />
                  <IconButton className={styles.customIcnButton}>
                    {!onFocus ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                  </IconButton>
                </Box>
                {formik.touched.selectedValue && formik.errors.selectedValue && (
                  <Typography className={styles.errorMsg}>{formik.errors.selectedValue}</Typography>
                )}

                {onFocus && (
                  <Box className={styles.DropDownBlock}>
                    <List>
                      {collegeData
                        ?.filter((data) => data.name.toLowerCase()?.includes(searchText.toLowerCase()))
                        ?.map((optionsData, index) => {
                          return (
                            <ListItem
                              key={index}
                              onClick={() => {
                                setSelectedCollege(optionsData);
                                formik.setValues({
                                  selectedValue: optionsData.collegeId
                                });
                              }}
                            >
                              <Link
                                href="#"
                                onClick={() => {
                                  setSearchText(optionsData.name);
                                  setOnFocus(false);
                                }}
                              >
                                {optionsData.name}
                              </Link>
                            </ListItem>
                          );
                        })}
                    </List>
                  </Box>
                )}
              </Box>
            ) : (
              <TextField
                fullWidth
                placeholder={placeHolder}
                value={formik.values.selectedValue > 0 && formik.values.selectedValue}
                onChange={formik.handleChange}
                type="number"
                name="selectedValue"
                error={formik.touched.selectedValue && Boolean(formik.errors.selectedValue)}
                helperText={
                  formik.touched.selectedValue && formik.errors.selectedValue ? formik.errors.selectedValue : ''
                }
              />
            )}
          </>

          {/* custom Search DropDown ends */}
          <Button
            className={`freeToolCard_ListTitleSub ${styles.formSubmitBtn}`}
            data-test-id="college-iq-form-submit-btn"
            type="submit"
          >
            {ProfileBannerContent.SUBMIT}
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};
export default BannerForm;
