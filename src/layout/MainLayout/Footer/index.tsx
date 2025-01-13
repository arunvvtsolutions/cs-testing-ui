import { Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import React from 'react';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));
import { Streams, LandingConst, Exams, OtherLinks } from '../../../constants';

const FooterMobile = dynamic(() => import('./FooterMobile'));
import {
  Footersec,
  FooterContainer,
  FooterListTitle,
  FooterList,
  FooterListItem,
  FooterLinks,
  Footerstrip
} from './styles';

import { BASE_URL, MEDICAL_BASE_URL} from 'config';

const footstriptxt = {
  marginRight: '16px',
  color: '#FFF !important',
  fontFamily: 'inherit',
  fontSize: { sm: '15px !important', md: '16px !important' },
  fontStyle: 'normal',
  fontWeight: 500,
  textTransform: 'capitalize',
  '&:hover': {
    color: '#17D3A1 !important'
  }
};

const Footer: React.FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
      <Footersec>
        <FooterContainer>
          {matchDownSM ? (
            <Box>
              <FooterMobile />
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box>
                  <Box mb={4}>
                    <FooterListTitle>{Streams.ENGINEERING}</FooterListTitle>
                    <FooterList aria-label="basic-list">
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/iit/engineering/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_IIT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/nit/engineering/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_NIT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/iiit/engineering/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_IIIT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/gfti/engineering/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_GFTI_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/government/engineering/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/private/engineering/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_PRIVATE_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/engineering/colleges-in-india`}
                        >
                          {LandingConst.TOP_ENGINEERING_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                    </FooterList>
                  </Box>
                  <Box mb={4}>
                    <FooterListTitle>{Streams.ARCHITECTURE}</FooterListTitle>
                    <FooterList aria-label="basic-list">
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/iit/architecture/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_IIT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/nit/architecture/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_NIT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/government/architecture/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/10/private/architecture/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_PRIVATE_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`https://cs-ui-ten.vercel.app/top/architecture/colleges-in-india`}
                        >
                          {LandingConst.TOP_ARCHITECTURE_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                    </FooterList>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    borderRight: '1px solid #3A4B69',
                    borderLeft: '1px solid #3A4B69',
                    padding: '0px 40px'
                  }}
                >
                  <Box mb={4}>
                    <FooterListTitle> {Streams.MEDICAL}</FooterListTitle>
                    <FooterList aria-label="basic-list">
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`${MEDICAL_BASE_URL}/top/10/government/medical/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`${MEDICAL_BASE_URL}/top/10/private/medical/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_PRIVATE_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/medical/colleges-in-india`}>
                          {LandingConst.TOP_MEDICAL_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                    </FooterList>
                  </Box>
                  <Box mb={4}>
                    <FooterListTitle>{Streams.DENTAL}</FooterListTitle>
                    <FooterList aria-label="basic-list">
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`${MEDICAL_BASE_URL}/top/10/government/dental/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`${MEDICAL_BASE_URL}/top/10/private/dental/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_PRIVATE_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/dental/colleges-in-india`}>
                          {LandingConst.TOP_DENTAL_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                    </FooterList>
                  </Box>
                  <Box mb={4}>
                    <FooterListTitle>{Streams.PHARMACY}</FooterListTitle>
                    <FooterList aria-label="basic-list">
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`${MEDICAL_BASE_URL}/top/10/government/pharmacy/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks
                          prefetch={false}
                          href={`${MEDICAL_BASE_URL}/top/10/private/pharmacy/colleges-in-india`}
                        >
                          {LandingConst.TOP_10_PRIVATE_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/pharmacy/colleges-in-india`}>
                          {LandingConst.TOP_PHARMACY_COLLEGES}
                        </FooterLinks>
                      </FooterListItem>
                    </FooterList>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ boderLeft: '1px solid #fff', paddingLeft: '20px' }}>
                  <Box mb={4} display="none">
                    <FooterListTitle>{Streams.TOPEXAMS}</FooterListTitle>
                    <FooterList aria-label="basic-list">
                      <FooterListItem>
                        <FooterLinks href="#">{Exams.JEE_MAIN_EXAM}</FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks href="#">{Exams.VITEEE_ENTRANCE_EXAM}</FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks href="#">{Exams.JEE_ADVANCED}</FooterLinks>
                      </FooterListItem>
                    </FooterList>
                  </Box>
                  <Box mb={4}>
                    <FooterListTitle>{Streams.OTHERLINKS}</FooterListTitle>
                    <FooterList aria-label="basic-list">
                      <FooterListItem>
                        <FooterLinks prefetch={false} href={`${BASE_URL}/about`}>
                          {OtherLinks.ABOUT}{' '}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks prefetch={false} href={`${BASE_URL}/contact-us`}>
                          {OtherLinks.CONTACT_US}
                        </FooterLinks>
                      </FooterListItem>

                      {/* site-map-hidden-here-for-while */}
                      {/* <FooterListItem>
                        <FooterLinks href="#">{OtherLinks.SITEMAP}</FooterLinks>
                      </FooterListItem> */}
                      {/* site-map-hidden-here-for-while */}

                      <FooterListItem>
                        <FooterLinks prefetch={false} href={`${BASE_URL}/privacy-policies`}>
                          {OtherLinks.PRIVACY_TERMS}
                        </FooterLinks>
                      </FooterListItem>
                      <FooterListItem>
                        <FooterLinks prefetch={false} href={`${BASE_URL}/payment-cancellation-policy`}>
                          {OtherLinks.PAYMENT_CANCELLATION}
                        </FooterLinks>
                      </FooterListItem>
                    </FooterList>
                  </Box>
                  <Box>
                    <FooterListTitle>{Streams.FOLLOWUS}</FooterListTitle>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ maxWidth: '170px' }}>
                      <Link href="https://www.youtube.com/@CollegeSuggest" target="_blank" aria-label="YouTube">
                        <YouTubeIcon
                          sx={{
                            color: '#9198A6',
                            '&:hover': {
                              color: '#fff'
                            }
                          }}
                        />
                      </Link>

                      <Link
                        href="https://in.linkedin.com/company/college-suggest-india"
                        target="_blank"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon
                          sx={{
                            color: '#9198A6',
                            '&:hover': {
                              color: '#fff'
                            }
                          }}
                        />
                      </Link>

                      <Link
                        href="https://www.instagram.com/collegesuggestindia/?igshid=YmMyMTA2M2Y%3D"
                        target="_blank"
                        aria-label="Instagram"
                      >
                        <InstagramIcon
                          sx={{
                            color: '#9198A6',
                            '&:hover': {
                              color: '#fff'
                            }
                          }}
                        />
                      </Link>

                      <Link
                        href="https://twitter.com/i/flow/login?redirect_after_login=%2Fsuggestcollege"
                        target="_blank"
                        aria-label="Twitter"
                      >
                        <TwitterIcon
                          sx={{
                            color: '#9198A6',
                            '&:hover': {
                              color: '#fff'
                            }
                          }}
                        />
                      </Link>

                      <Link href="https://www.facebook.com/CollegeSuggestIndia" target="_blank" aria-label="Facebook">
                        <FacebookIcon
                          sx={{
                            color: '#9198A6',
                            '&:hover': {
                              color: '#fff'
                            }
                          }}
                        />
                      </Link>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </FooterContainer>
      </Footersec>
      <Footerstrip>
        <FooterContainer>
          <Grid container alignItems={'center'}>
            <Grid item xs={12} sm={12} md={6}>
              <FooterList aria-label="basic-list" sx={{ display: { xs: 'block', sm: 'flex' }, padding: '0px' }}>
                <FooterListItem style={{ marginBottom: '0px' }}>
                  <FooterLinks prefetch={false} href={`${BASE_URL}/about`} sx={footstriptxt}>
                    {OtherLinks.ABOUT}
                  </FooterLinks>
                </FooterListItem>
                <FooterListItem style={{ marginBottom: '0px' }}>
                  <FooterLinks prefetch={false} href={`${BASE_URL}/contact-us`} sx={footstriptxt}>
                    {OtherLinks.CONTACT_US}
                  </FooterLinks>
                </FooterListItem>
                <FooterListItem style={{ marginBottom: '0px' }}>
                  <FooterLinks prefetch={false} href={`${BASE_URL}/privacy-policies`} sx={footstriptxt}>
                    {OtherLinks.PRIVACY_TERMS}
                  </FooterLinks>
                </FooterListItem>
                {matchDownSM && (
                  <FooterListItem style={{ marginBottom: '0px' }}>
                    <FooterLinks prefetch={false} href={`${BASE_URL}/payment-cancellation-policy`} sx={footstriptxt}>
                      {OtherLinks.PAYMENT_CANCELLATION}
                    </FooterLinks>
                  </FooterListItem>
                )}
              </FooterList>
            </Grid>
            <Grid item alignItems={'center'} xs={12} sm={12} md={6}>
              <Box
                sx={{
                  ...footstriptxt,
                  textAlign: { xs: 'left', sm: 'left', md: 'right' },
                  marginTop: { sm: '0px', xs: '10px' },
                  display: 'flex',
                  justifyContent: { xs: 'start', lg: 'end' },
                  alignItems: 'center',
                  '&:hover': {
                    color: '#fff' // Remove underline on hover
                  }
                }}
                style={{ marginRight: '0px' }}
              >
                2024 ©
                <Typography
                  sx={{
                    textDecoration: 'underline',
                    color: '#fff',
                    margin: '0px 5px 0px',
                    fontSize: { xs: '13px', sm: '16px' },
                    '&:hover': {
                      color: '#17D3A1' // Remove underline on hover
                    }
                  }}
                >
                  <Link href={`${BASE_URL}`}>collegesuggest.com,</Link>
                </Typography>
                All Rights Reserved.
              </Box>
            </Grid>
          </Grid>
        </FooterContainer>
      </Footerstrip>
    </>
  );
};

export default Footer;
