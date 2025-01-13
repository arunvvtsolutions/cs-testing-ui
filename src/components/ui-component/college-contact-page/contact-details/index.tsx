import { Box, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

import styles from './Contact.module.css';
import { ContactDetailTitles } from './constant';
import MainIcon from './MainIcon';
import SocialMediaIcon from './SocialMediaIcon';

import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IContact {
  shortName?: string;
  address?: string;
  telephone?: string;
  website?: string;
  mail?: string;
  faceBook?: string;
  instaGram?: string;
  youTube?: string;
  linkedIn?: string;
}

export interface IContactProps extends IErrorProps {
  contactData: IContact;
}

const ContactDetails: React.FC<IContactProps> = ({ contactData, hasError }) => {
  const allDataIsEmpty = Object.values(contactData).every((value) => value === '');

  if (!allDataIsEmpty) {
    return (
      <>
        {hasError ? (
          <ErrorComponent />
        ) : (
          <Box className={styles.mainSection} data-test-id="contact-details">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {contactData?.shortName} {ContactDetailTitles.CONTACT}
              </Typography>
            </Box>
            <Box>
              <Grid container spacing={2}>
                {contactData?.address && (
                  <Grid xs={12} md={6} lg={3}>
                    <Box className={styles.contactCard}>
                      <Box className={styles.contactIcons}>
                        <MainIcon src="college-contact-icons/icon1.svg" altText="address icon" />
                      </Box>
                      <Typography className={styles.contactTitles}>{ContactDetailTitles.ADDRESS}</Typography>
                      <Typography className={styles.contactAddressDiscp}>{contactData?.address}</Typography>
                    </Box>
                  </Grid>
                )}
                {contactData?.telephone && (
                  <Grid xs={12} md={6} lg={3}>
                    <Box className={styles.contactCard}>
                      <Box className={styles.contactIcons}>
                        <MainIcon src="college-contact-icons/icon2.svg" altText="telephone icon" />
                      </Box>
                      <Typography className={styles.contactTitles}>{ContactDetailTitles.TELEPHONE}</Typography>
                      <Typography className={styles.contactTelePhoneAndMail}>{contactData?.telephone}</Typography>
                    </Box>
                  </Grid>
                )}
                {contactData?.mail || contactData?.website ? (
                  <Grid xs={12} md={6} lg={3}>
                    <Box className={styles.contactCard}>
                      <Box className={styles.contactIcons}>
                        <MainIcon src="college-contact-icons/icon3.svg" altText="mail icon" />
                      </Box>
                      <Typography className={styles.contactTitles}>{ContactDetailTitles.OUR_WEBSITE_MAIL}</Typography>
                      <Link
                        className={styles.contactTelePhoneAndMail}
                        href={`//${contactData.website}`}
                        target="_blank"
                      >
                        {contactData?.website}
                      </Link>
                      <Link className={styles.contactTelePhoneAndMail} href={contactData.mail}>
                        {contactData?.mail}
                      </Link>
                    </Box>
                  </Grid>
                ) : null}
                {contactData?.faceBook ||
                contactData?.instaGram ||
                contactData?.youTube ||
                contactData?.youTube ||
                contactData?.linkedIn ? (
                  <Grid xs={12} md={6} lg={3}>
                    <Box className={styles.contactCard}>
                      <Box className={styles.contactIcons}>
                        <MainIcon src="college-contact-icons/icon3.svg" altText="social icon" />
                      </Box>
                      <Typography className={styles.contactTitles}>{ContactDetailTitles.SOCIAL_LINKS}</Typography>
                      <Box className={styles.contactSocialLinks}>
                        {contactData?.faceBook && (
                          <Link href={contactData.faceBook}>
                            <SocialMediaIcon src="college-contact-icons/facebook.svg" altText="facebook icon" />
                          </Link>
                        )}
                        {contactData?.instaGram && (
                          <Link href={contactData.instaGram}>
                            <SocialMediaIcon src="college-contact-icons/instagram.svg" altText="instagram icon" />
                          </Link>
                        )}
                        {contactData?.youTube && (
                          <Link href={contactData.youTube}>
                            <SocialMediaIcon src="college-contact-icons/youtube.svg" altText="youtube icon" />
                          </Link>
                        )}
                        {contactData?.linkedIn && (
                          <Link href={contactData.linkedIn}>
                            <SocialMediaIcon src="college-contact-icons/linkedin.svg" altText="linkedin icon" />
                          </Link>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          </Box>
        )}
      </>
    );
  }

  return null; // Hide the component if all data is empty.
};
export default ContactDetails;
