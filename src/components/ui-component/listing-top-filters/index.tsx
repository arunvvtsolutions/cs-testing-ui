import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import CollegeCount from './CollegeCount';
import SortBySelect from './SortBySelect';
import ListingSearch from './ListingSearch';
import { TopFilterSec } from './styles';
import ListingTopFiltersMobile from './listing-top-filters-mobile';

import { ICollege, ICollegeData, IFilterData } from 'types/college';

interface ListingTopFiltersProps {
  sortHandler: (ket: string) => void;
  collegeData: ICollege[];
  searchText: string;
  setSearchText: (data: string) => void;
  count: number;
  topColleges: ICollegeData;
  filterHandler: (data: IFilterData) => void;
  filterState: IFilterData;
  setState: (data: IFilterData) => void;
}
const ListingTopFilters: React.FC<ListingTopFiltersProps> = ({
  sortHandler,
  collegeData,
  searchText,
  setSearchText,
  count,
  filterHandler,
  topColleges,
  filterState,
  setState
}) => {
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <div>
      <TopFilterSec>
        {/* mobile and desktop both breakpoints below */}
        {matchDownLg ? (
          <ListingTopFiltersMobile
            sortHandler={sortHandler}
            collegeData={collegeData}
            searchText={searchText}
            setSearchText={setSearchText}
            filterHandler={filterHandler}
            topColleges={topColleges}
            filterState={filterState}
            setState={setState}
          />
        ) : (
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={3}>
              <CollegeCount count={count} />
            </Grid>
            <Grid item xs={4}>
              <SortBySelect sortHandler={sortHandler} />
            </Grid>
            <Grid item xs={5}>
              <ListingSearch searchText={searchText} setSearchText={setSearchText} />
            </Grid>
          </Grid>
        )}
      </TopFilterSec>
    </div>
  );
};

export default ListingTopFilters;
