import React from 'react';
import parser from 'html-react-parser';
import { Box, Typography } from '@mui/material';

import { IErrorProps } from 'types';

interface IContentDataProps {
  shortName: string;
  collegeId: number;
  description: string;
}
export interface IContentProps extends IErrorProps {
  contentData: IContentDataProps[];
}

const ContentSection: React.FC<IContentProps> = ({ contentData }) => {
  return (
    <>
      {contentData && (
        <Box
          className="cgDynamicText"
          key={contentData[0].collegeId}
          data-test-id={`placement-overview-content-${contentData[0].collegeId}`}
        >
          <Typography>{parser(contentData[0].description)}</Typography>
        </Box>
      )}
    </>
  );
};

export default ContentSection;
