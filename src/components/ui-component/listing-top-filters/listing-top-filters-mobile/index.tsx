import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';

import ListingSearch from '../ListingSearch';
import { MobTopFiltrWarp, IconBx, FlotBx } from '../styles';
import SortBySelect from '../SortBySelect';

import CollegeFilter from 'ui-component/listing-page/filter';
import { ICollege, ICollegeData, IFilterData } from 'types/college';
import { FilterKeysConstants } from 'ui-component/listing-page/college-card/constant';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ListingTopFiltersMobileProps {
  sortHandler: (ket: string) => void;
  collegeData: ICollege[];
  searchText: string;
  setSearchText: (data: string) => void;
  topColleges: ICollegeData;
  filterHandler: (data: IFilterData) => void;
  filterState: IFilterData;
  setState: (data: IFilterData) => void;
}
const ListingTopFiltersMobile: React.FC<ListingTopFiltersMobileProps> = ({
  sortHandler,
  collegeData,
  searchText,
  setSearchText,
  topColleges,
  filterHandler,
  filterState,
  setState
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [showFlotBx, setShowFlotBx] = useState(false);
  const handleOpen = () => {
    setShowFlotBx(true);
  };
  const handleClose = () => {
    setShowFlotBx(false);
    setOpen(false);
    setSearchText('');
  };
  const clsIcn = {
    position: 'absolute',
    top: '50%',
    right: '0px',
    transform: 'translateY(-50%)'
  };

  return (
    <>
      <MobTopFiltrWarp>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={9}>
            <SortBySelect sortHandler={sortHandler} />
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" spacing={1} padding={'0'}>
              <IconBx>
                <FilterListIcon onClick={handleClickOpen} />
              </IconBx>
              <IconBx onClick={handleOpen}>
                <SearchIcon />
              </IconBx>
            </Stack>
          </Grid>
        </Grid>
      </MobTopFiltrWarp>
      {/* mobile listing search is below */}
      <FlotBx filterOpen={showFlotBx}>
        <ListingSearch searchText={searchText} setSearchText={setSearchText} />
        <CloseIcon onClick={handleClose} sx={clsIcn} />
      </FlotBx>
      ​{/* mobile listing filter below */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} style={{ zIndex: '10000' }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 16px'
            }}
          >
            <h3>{FilterKeysConstants.FILTER}</h3>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box padding={'10px'}>
          <CollegeFilter
            data={topColleges}
            filterHandler={filterHandler}
            filterState={filterState}
            setState={setState}
          />
        </Box>
      </Dialog>
    </>
  );
};
export default ListingTopFiltersMobile;
