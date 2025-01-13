import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { FilterBox, FilterContent as MuiFilterConent } from 'ui-component/listing-page/filter/styles';

const SelectedContent = ({
  content,
  clearFilterHandler,
  hidCloseIcon = false,
  type,
  contentId
}: {
  content: string;
  clearFilterHandler: (contentId?: string, type?: string) => void;
  hidCloseIcon?: boolean;
  type: string;
  contentId: string;
}) => {
  return (
    <>
      <FilterBox>
        <MuiFilterConent>
          {!hidCloseIcon && (
            <CloseIcon
              sx={{
                width: '12px',
                height: '12px',
                color: '#202124',
                marginRight: '4px',
                cursor: 'pointer'
              }}
              onClick={() => clearFilterHandler(contentId, type)}
              data-test-id={`neet-predictor-filter-header-${content}`}
            ></CloseIcon>
          )}
          {content}
        </MuiFilterConent>
      </FilterBox>
    </>
  );
};

export default SelectedContent;
