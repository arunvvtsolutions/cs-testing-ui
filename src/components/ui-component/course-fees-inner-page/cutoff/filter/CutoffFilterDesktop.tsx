import { Box } from '@mui/system';

import CollegeInfo from './CourseData';
import RadioOptionFilter from './RadioOptionFilter';

import { IErrorProps } from 'types';
import { ISubMenuProps } from 'ui-component/subheader';

export interface ICutoffsFilter {
  caste: string;
  gender: string;
  quota: string;
}

interface IFilterItemsProps {
  id: number;
  type: string;
}

export interface ICourseProps {
  caste: IFilterItemsProps[];
  gender: IFilterItemsProps[];
  quota: IFilterItemsProps[];
}

export interface IFilterProps extends IErrorProps, ISubMenuProps {
  filteredData: ICourseProps;
  setState: (data: ICutoffsFilter) => void;
  filterState: ICutoffsFilter;
}

const CutoffsFilterDesktop: React.FC<IFilterProps> = ({ filteredData, filterState, setState }) => {
  const collegeInfo = new CollegeInfo(filteredData);

  const setSelectedValue = (key: string, value: string) => {
    setState({ ...filterState, [key]: value });
  };

  return (
    <Box data-test-id="course-fees-inner-cutoff-filter-desktop">
      <Box sx={{ paddingBottom: '12px' }}>
        <RadioOptionFilter
          filterKey="caste"
          setSelectedValue={setSelectedValue}
          filterData={collegeInfo.getCasteData()}
          label={'Caste Type'}
          selectedValues={filterState.caste}
          expand="panel1"
        ></RadioOptionFilter>
      </Box>
      <Box sx={{ paddingBottom: '12px' }}>
        <RadioOptionFilter
          setSelectedValue={setSelectedValue}
          filterData={collegeInfo.getGenderData()}
          filterKey="gender"
          label={'Gender'}
          selectedValues={filterState.gender}
          expand="panel2"
        ></RadioOptionFilter>
      </Box>

      <Box sx={{ paddingBottom: '12px' }}>
        <RadioOptionFilter
          setSelectedValue={setSelectedValue}
          filterData={collegeInfo.getQuotaData()}
          filterKey={'quota'}
          label={'Quota'}
          selectedValues={filterState.quota}
          expand="panel2"
        ></RadioOptionFilter>
      </Box>
    </Box>
  );
};
export default CutoffsFilterDesktop;
