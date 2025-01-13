import React, { FC, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Image from 'next/image';
import { Add, Close, Search } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

import CustomizedDialogs from '../../common/dialog';

import styles from './styles.module.css';
import { ModalConstants } from './constant';

import { ICollege } from 'types/college';
import useAuth from 'hooks/useAuth';
import { postAddCompareHistory } from 'utils/api/compare-college';
import { findStream } from 'utils';

const autoCompleteSx = {
  fieldset: {
    border: 'none',
    padding: '0'
  },
  '.MuiOutlinedInput-root': {
    padding: '6.5px !important'
  },
  '.MuiChip-root': {
    marginRight: '15px'
  }
};
interface IHistoryModel {
  handlClose: () => void;
  open: boolean;
  compareColleges: ICollege[];
  setCompareColleges: (data: ICollege[]) => void;
  collegeData: ICollege[];
}

const CompareHistoryModel: FC<IHistoryModel> = ({
  handlClose,
  open,
  compareColleges,
  setCompareColleges,
  collegeData
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<ICollege | null>();
  const limit = isMdDown ? 2 : 3;

  const handleRemoveCollege = (shortUrl: string) => {
    setCompareColleges([...compareColleges.filter((college) => college.shortUrl !== shortUrl)]);
  };

  // custome filter
  const handleFilter = (options: ICollege[], { inputValue }: { inputValue: string }) => {
    return options.filter(
      (college) =>
        college.name.toLowerCase().replaceAll(' ', '').includes(inputValue.toLowerCase().replaceAll(' ', '')) ||
        college.shortName.toLowerCase().replaceAll(' ', '').includes(inputValue.toLowerCase().replaceAll(' ', ''))
    );
  };

  // select college
  const handleSelectCollege = (value: ICollege) => {
    setSelectedCollege(value);
    setCompareColleges([...compareColleges, value]);
    setShowSearch(false);
    setSelectedCollege(null);
  };

  const handleCompare = async () => {
    if (user?.id) {
      const colleges = compareColleges.slice(0, limit).map((clg) => clg.shortUrl);
      let url = '/colleges-comparison';
      colleges.forEach((clg) => {
        url = url.concat('/' + clg);
      });
      const postHistoryData = {
        userId: Number(user.id),
        stream: findStream(window.location.host).stream,
        collegeIds: compareColleges.map((clg) => clg.id.toString())
      };
      await postAddCompareHistory(postHistoryData);
      router.push(url);
    } else router.push('/sign-in');
  };

  useEffect(() => {
    if (compareColleges.length >= 3) {
      setShowSearch(false);
    }
  }, [compareColleges]);

  return (
    <CustomizedDialogs open={open} handleClose={handlClose} maxWidth={isMdDown ? 'xs' : 'sm'}>
      <Stack className={styles.compareStack}>
        {[1, 2, 3].slice(0, limit).map((value, index) => {
          return compareColleges[index] ? (
            <Box key={index}>
              <Box className={styles.collegeBox}>
                <Image
                  className={styles.compareCollegeImg}
                  src={
                    compareColleges[index].logo
                      ? `/assets/images/cs/${compareColleges[index].logo}`
                      : '/assets/images/cs/campus.webp'
                  }
                  width={100}
                  height={100}
                  alt="college image"
                  data-test-id={`compare-colleges-img-from-listingpage-${index}`}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/cs/campus.webp';
                  }}
                />
                <IconButton
                  className={styles.compareCloseBox}
                  onClick={() => handleRemoveCollege(compareColleges[index].shortUrl)}
                >
                  <Close sx={{ width: '18px', height: '18px' }} />
                </IconButton>
              </Box>
              <Typography textAlign="center" mt={1.5} width="100%" textOverflow={'wrap'}>
                {compareColleges[index].shortName}
              </Typography>
            </Box>
          ) : (
            <Box key={index}>
              <Box className={styles.collegeBox}>
                <IconButton onClick={() => setShowSearch(true)} data-test-id={`compare-colleges-add-btn-${index}`}>
                  <Add
                    sx={{
                      fontSize: {
                        xs: '30px !important',
                        md: '50px !important'
                      },
                      color: '#202124 !important'
                    }}
                  />
                </IconButton>
              </Box>
              <Typography textAlign="center" mt={1.5}>
                {ModalConstants.ADDCOLLEGE}
              </Typography>
            </Box>
          );
        })}
      </Stack>
      {showSearch && (
        <Stack className={styles.compareSearchStack}>
          <FormControl fullWidth>
            <Autocomplete
              id="stream"
              options={collegeData}
              getOptionLabel={(option) => option.name}
              filterOptions={handleFilter}
              onChange={(e, newValue) => newValue && handleSelectCollege(newValue)}
              noOptionsText={'No Colleges found'}
              data-test-id="compare-colleges-from-listingpage"
              getOptionDisabled={(option: ICollege) => compareColleges.some((college) => college?.id === option.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <IconButton>
                        <Search />
                      </IconButton>
                    )
                  }}
                  sx={autoCompleteSx}
                />
              )}
            />
          </FormControl>
        </Stack>
      )}
      <Stack className={styles.compareBtnStack}>
        <Button
          className={styles.compareSubmitBtn}
          disabled={!selectedCollege?.id && compareColleges.length < (isMdDown ? 2 : 3)}
          onClick={handleCompare}
          data-test-id="compare-colleges-btn-from-listingpage"
        >
          <Typography className={styles.compareSubmitTxt}>Compare College</Typography>
        </Button>
      </Stack>
    </CustomizedDialogs>
  );
};

export default CompareHistoryModel;
