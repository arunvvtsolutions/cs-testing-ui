/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import orderBy from 'lodash/orderBy';

import FilterComponent from './filter';
import CollegeInfo from './CollegeData';

import ICheckboxItem, { IFilterData, ICollegeData } from 'types/college';
import FilterHeader from 'ui-component/listing-page/filter/filter-header';
import { replaceSpecialChar } from 'utils';
interface FilterProps {
  data: ICollegeData;
  filterHandler: (filterData: IFilterData) => void;
  filterState: IFilterData;
  setState: (filterState: IFilterData) => void;
}

const Filter: React.FC<FilterProps> = ({ data, filterHandler, filterState, setState }) => {
  const collegeInfo = new CollegeInfo(data);

  const [expanded, setExpanded] = useState<string | boolean>(false);
  const [cityData, setCityData] = useState<ICheckboxItem[]>([]);
  const [searchCourse, setSearchCourse] = useState<string>('');
  const handleExpand = (panel: string) => async (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const clearAllSelectedState = () => {
    setState({
      state: [],
      ownership: [],
      category: [],
      course: [],
      city: []
    });
    filterHandler({
      category: [],
      ownership: [],
      state: [],
      course: [],
      city: []
    });
  };

  const clearStateHandler = (selectedState: string) => {
    const state = filterState.state.filter((c) => c.id !== selectedState);
    const city = filterState.city.filter((city) =>
      state.some((state) => city.depended && replaceSpecialChar(state.id) === replaceSpecialChar(city.depended))
    );

    setState({
      ...filterState,
      state,
      city: city
    });
    filterHandler({ ...filterState, state, city });
  };
  const clearCityHandler = (selectedCity: string) => {
    const city = filterState.city.filter((c) => c.id !== selectedCity);
    setState({ ...filterState, city });
    filterHandler({ ...filterState, city });
  };

  const clearOwnershipHandler = (selectedOwnership: string) => {
    const ownership = filterState.ownership.filter((c) => c.id !== selectedOwnership);
    setState({ ...filterState, ownership });
    filterHandler({ ...filterState, ownership });
  };

  const clearCategoryHandler = (selectedCategory: string) => {
    const category = filterState.category.filter((c) => c.id !== selectedCategory);
    setState({ ...filterState, category });
    filterHandler({ ...filterState, category });
  };

  const clearCoursesHandler = (selectedCourse: string) => {
    const course = filterState.course.filter((c) => c.id !== selectedCourse);
    setState({ ...filterState, course });
    filterHandler({ ...filterState, course });
  };

  const setSelectedValue = (key: string, value: { id: string; label: string }[]) => {
    setState({ ...filterState, [key]: value });
    filterHandler({ ...filterState, [key]: value });
  };

  useEffect(() => {
    if (filterState.state.length > 0) {
      const city = orderBy(collegeInfo.getCheckBoxItem('city', filterState.state));
      setCityData(city);
    } else {
      setCityData(orderBy(collegeInfo.getCheckBoxItem('city')));
    }
  }, [filterState.state]);

  return (
    <>
      <Box sx={{ paddingBottom: '12px' }} data-test-id="listing-page-filter">
        <FilterHeader
          selectedFilter={filterState}
          clearAllSelectedState={clearAllSelectedState}
          clearStateHandler={clearStateHandler}
          clearCityHandler={clearCityHandler}
          clearOwnershipHandler={clearOwnershipHandler}
          clearCategoryHandler={clearCategoryHandler}
          clearCoursesHandler={clearCoursesHandler}
        ></FilterHeader>
        <FilterComponent
          expanded={expanded}
          handleExpand={handleExpand}
          setSelectedValue={setSelectedValue}
          filterData={orderBy(collegeInfo.getCheckBoxItem('state'), 'label')}
          filterKey={'state'}
          label={'State'}
          selectedValues={[...filterState.state]}
        ></FilterComponent>
        <FilterComponent
          expanded={expanded}
          handleExpand={handleExpand}
          setSelectedValue={setSelectedValue}
          filterData={orderBy(cityData, 'label')}
          filterKey={'city'}
          label={'City'}
          selectedValues={[...filterState.city]}
        ></FilterComponent>
        <FilterComponent
          expanded={expanded}
          handleExpand={handleExpand}
          setSelectedValue={setSelectedValue}
          filterData={collegeInfo.getCheckBoxItem('ownership')}
          filterKey={'ownership'}
          label={'Ownership'}
          selectedValues={[...filterState.ownership]}
        ></FilterComponent>
        <FilterComponent
          expanded={expanded}
          handleExpand={handleExpand}
          setSelectedValue={setSelectedValue}
          filterData={collegeInfo.getCheckBoxItem('category')}
          filterKey={'category'}
          label={'Category'}
          selectedValues={[...filterState.category]}
        ></FilterComponent>
        <FilterComponent
          expanded={expanded}
          handleExpand={handleExpand}
          setSelectedValue={setSelectedValue}
          filterData={orderBy(collegeInfo.getCheckBoxItem('course'), 'label')}
          filterKey={'course'}
          label={'Course'}
          selectedValues={[...filterState.course]}
          searchCourse={searchCourse}
          setSearchCourse={setSearchCourse}
        ></FilterComponent>
      </Box>
    </>
  );
};
export default Filter;
