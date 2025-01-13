import parser from 'html-react-parser';
import { Box, Typography } from '@mui/material';

import { IErrorProps } from 'types';

export interface IContentProps extends IErrorProps {
  contentData: {
    shortName?: string;
    collegeId: string;
    description: string;
  }[];
}

const ContentSection: React.FC<IContentProps> = ({ contentData }) => {
  return (
    <Box data-test-id="course-fees-content-section">
      {contentData && (
        <Box className="cgDynamicText">
          <Typography>{parser(contentData[0].description)}</Typography>
        </Box>
      )}
    </Box>
  );
};
export default ContentSection;
