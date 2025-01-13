import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { FilterContent as MuiFilterConent, FilterBox } from '../styles';

const ClearAllFilters = ({ title, clearAllSelectedState }: { title: string; clearAllSelectedState: () => void }) => {
  return (
    <FilterBox>
      <MuiFilterConent
        onClick={clearAllSelectedState}
        sx={{
          background: '#5e6773',
          color: '#fff',
          cursor: 'pointer'
        }}
        data-test-id="listing-page-filter-header-clearall"
      >
        <CloseIcon
          sx={{
            width: '12px',
            height: '12px',
            color: '#fff',
            marginRight: '4px'
          }}
        ></CloseIcon>
        {title}
      </MuiFilterConent>
    </FilterBox>
  );
};

export default ClearAllFilters;
