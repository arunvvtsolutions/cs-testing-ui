import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { FilterContent as MuiFilterConent, FilterBox } from '../styles';

const FilterContent = ({
  content,
  clearFilterHandler
}: {
  content: string;
  clearFilterHandler: (content?: string) => void;
}) => {
  return (
    <>
      <FilterBox>
        <MuiFilterConent>
          <CloseIcon
            sx={{
              width: '12px',
              height: '12px',
              color: '#202124',
              marginRight: '4px',
              cursor: 'pointer'
            }}
            onClick={() => clearFilterHandler(content)}
            data-test-id={`listing-page-filter-header-${content}`}
          ></CloseIcon>
          {content}
        </MuiFilterConent>
      </FilterBox>
    </>
  );
};

export default FilterContent;
