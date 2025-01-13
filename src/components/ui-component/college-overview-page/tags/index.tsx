import React from 'react';
import { Box, Typography } from '@mui/material';

import { IHighlightsProps } from '../highlights';

import RelatedTag from './RelatedTags';
import styles from './Tags.module.css';
import { RelatedTags } from './constant';

import ErrorComponent from 'ui-component/error';

const TagSection: React.FC<IHighlightsProps> = ({ highlightData, hasError, subMenu }) => {
  return (
    <>
      <Box className={styles.tagContent}>
        {hasError ? (
          <ErrorComponent />
        ) : (
          <>
            <Box style={{ marginBottom: '25px' }}>
              <Typography className="subHeadText">
                {highlightData.shortName} {RelatedTags.RELATED_TAGS}
              </Typography>
            </Box>
            {/* import this RelatedTag and pass the data */}
            <RelatedTag tagShortName={highlightData.shortName} subMenu={subMenu} />
          </>
        )}
      </Box>
    </>
  );
};

export default TagSection;
