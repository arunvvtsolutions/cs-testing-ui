import { Box } from '@mui/material';
import parser from 'html-react-parser';

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
    <Box>
      {contentData && (
        <Box
          className="cgDynamicText"
          key={contentData[0].collegeId}
          data-test-id={`admission-eligibility-content-${contentData[0].collegeId}`}
        >
          {contentData[0].description && parser(contentData[0].description)}
        </Box>
      )}
    </Box>
  );
};

export default ContentSection;
