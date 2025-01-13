import React from 'react';
import { Box } from '@mui/material';

import { IqBannerContants } from './constant';

import ProfileBanner from 'ui-component/common/profile-banner';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IBannerDataProps {
  collegeId: number;
  name: string;
  shortUrl: string;
  shortName: string;
}
export interface IIqBannerProps extends IErrorProps {
  collegeData: IBannerDataProps[];
  handleSelect?: (e: string | number, shortUrl?: string) => void;
  selectedCollege: string | number;
}

const IqBanner: React.FC<IIqBannerProps> = ({ collegeData, hasError, handleSelect, selectedCollege }) => {
  const iqDesc: string[] = [
    IqBannerContants.IQ_DESC_ONE,
    IqBannerContants.IQ_DESC_TWO,
    IqBannerContants.IQ_DESC_THREE,
    IqBannerContants.IQ_DESC_FOUR,
    IqBannerContants.IQ_DESC_FIVE
  ];

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box data-test-id="college-iq-banner">
          <ProfileBanner
            title={IqBannerContants.TITLE}
            bannerDesc={IqBannerContants.TITLE_DESC}
            descPoints={iqDesc}
            formData={collegeData}
            showDropDown
            handleSelect={handleSelect}
            value={selectedCollege}
            formHeading={IqBannerContants.FORM_HEADING}
            placeHolder={IqBannerContants.FORM_PLACEHOLDER}
          />
        </Box>
      )}
    </>
  );
};
export default IqBanner;
