import React from 'react';
import parser from 'html-react-parser';
import { Box } from '@mui/material';

import { IErrorProps } from 'types';

export interface IAdmissionProps extends IErrorProps {
  admissionData: {
    shortName?: string;
    collegeId: number;
    description: string;
  }[];
}

const Admission: React.FC<IAdmissionProps> = ({ admissionData }) => {
  return (
    <Box>
      {admissionData[0]?.description && <Box className="cgDynamicText">{parser(admissionData[0]?.description)}</Box>}
    </Box>
  );
};

export default Admission;
