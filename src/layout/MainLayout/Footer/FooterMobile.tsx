import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Stack } from '@mui/system';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

import { Streams, LandingConst, Exams, OtherLinks } from '../../../constants';

import { FooterListTitle, FooterList, FooterListItem, FooterLinks } from './styles';

import { BASE_URL, ENGINEERING_BASE_URL, MEDICAL_BASE_URL } from 'config';
const FooterMobile = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordiunStyle = {
    background: '#091E44',
    margin: '0px !important'
  };

  const accordiunHead = {
    minheight: '0'
  };

  return (
    <div>
      <Accordion sx={accordiunStyle} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={
            expanded === 'panel1' ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
          }
          sx={accordiunHead}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{
            borderBottom: '1px solid #848EA1'
          }}
        >
          <FooterListTitle>{Streams.ENGINEERING}</FooterListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <FooterList aria-label="basic-list">
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${ENGINEERING_BASE_URL}/top/10/iit/engineering/colleges-in-india`}>
                {LandingConst.TOP_10_IIT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${ENGINEERING_BASE_URL}/top/10/nit/engineering/colleges-in-india`}>
                {LandingConst.TOP_10_NIT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${ENGINEERING_BASE_URL}/top/10/iiit/engineering/colleges-in-india`}>
                {LandingConst.TOP_10_IIIT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${ENGINEERING_BASE_URL}/top/10/gfti/engineering/colleges-in-india`}>
                {LandingConst.TOP_10_GFTI_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks
                prefetch={false}
                href={`${ENGINEERING_BASE_URL}/top/10/government/engineering/colleges-in-india`}
              >
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks
                prefetch={false}
                href={`${ENGINEERING_BASE_URL}/top/10/private/engineering/colleges-in-india`}
              >
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${ENGINEERING_BASE_URL}/top/engineering/colleges-in-india`}>
                {LandingConst.TOP_ENGINEERING_COLLEGES}
              </FooterLinks>
            </FooterListItem>
          </FooterList>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={accordiunStyle} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={
            expanded === 'panel2' ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
          }
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          style={{
            borderBottom: '1px solid #848EA1'
          }}
        >
          <FooterListTitle>{Streams.ARCHITECTURE}</FooterListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <FooterList aria-label="basic-list">
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${ENGINEERING_BASE_URL}/top/10/iit/architecture/colleges-in-india`}>
                {LandingConst.TOP_10_IIT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${ENGINEERING_BASE_URL}/top/10/nit/architecture/colleges-in-india`}>
                {LandingConst.TOP_10_NIT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks
                prefetch={false}
                href={`${ENGINEERING_BASE_URL}/top/10/government/architecture/colleges-in-india`}
              >
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks
                prefetch={false}
                href={`${ENGINEERING_BASE_URL}/top/10/private/architecture/colleges-in-india`}
              >
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${ENGINEERING_BASE_URL}/top/architecture/colleges-in-india`}>
                {LandingConst.TOP_ARCHITECTURE_COLLEGES}
              </FooterLinks>
            </FooterListItem>
          </FooterList>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={accordiunStyle}>
        <AccordionSummary
          expandIcon={
            expanded === 'panel3' ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
          }
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          style={{
            borderBottom: '1px solid #848EA1'
          }}
        >
          <FooterListTitle>{Streams.MEDICAL}</FooterListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <FooterList aria-label="basic-list">
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/10/government/medical/colleges-in-india`}>
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/10/private/medical/colleges-in-india`}>
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/medical/colleges-in-india`}>
                {LandingConst.TOP_MEDICAL_COLLEGES}
              </FooterLinks>
            </FooterListItem>
          </FooterList>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={accordiunStyle}>
        <AccordionSummary
          expandIcon={
            expanded === 'panel4' ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
          }
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          style={{
            borderBottom: '1px solid #848EA1'
          }}
        >
          <FooterListTitle>{Streams.DENTAL}</FooterListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <FooterList aria-label="basic-list">
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/10/government/dental/colleges-in-india`}>
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/10/private/dental/colleges-in-india`}>
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/dental/colleges-in-india`}>
                {LandingConst.TOP_DENTAL_COLLEGES}
              </FooterLinks>
            </FooterListItem>
          </FooterList>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} sx={accordiunStyle}>
        <AccordionSummary
          expandIcon={
            expanded === 'panel5' ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
          }
          aria-controls="panel5bh-content"
          id="panel5bh-header"
          style={{
            borderBottom: '1px solid #848EA1'
          }}
        >
          <FooterListTitle>{Streams.PHARMACY}</FooterListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <FooterList aria-label="basic-list">
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/10/government/pharmacy/colleges-in-india`}>
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/10/private/pharmacy/colleges-in-india`}>
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </FooterLinks>
            </FooterListItem>
            <FooterListItem>
              <FooterLinks prefetch={false} href={`${MEDICAL_BASE_URL}/top/pharmacy/colleges-in-india`}>
                {LandingConst.TOP_PHARMACY_COLLEGES}
              </FooterLinks>
            </FooterListItem>
          </FooterList>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
        sx={{ accordiunStyle, display: 'none' }}
      >
        <AccordionSummary
          expandIcon={
            expanded === 'panel6' ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
          }
          aria-controls="panel6bh-content"
          id="panel6bh-header"
          style={{
            borderBottom: '1px solid #848EA1'
          }}
        >
          <FooterListTitle>{Streams.TOPEXAMS}</FooterListTitle>
        </AccordionSummary>

        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} sx={accordiunStyle}>
        <AccordionSummary
          expandIcon={
            expanded === 'panel7' ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
          }
          aria-controls="panel6bh-content"
          id="panel6bh-header"
          style={{
            borderBottom: '1px solid #848EA1'
          }}
        >
          <FooterListTitle>OTHER LINKS</FooterListTitle>
        </AccordionSummary>

        <AccordionDetails>
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
            {/* hidden_here_for_while */}
            {/* <FooterListItem >
            <FooterLinks href="#">{OtherLinks.SITEMAP}</FooterLinks>
            </FooterListItem> */}
            {/* hidden_here_for_while */}
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
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')} sx={accordiunStyle}>
        <AccordionSummary
          expandIcon={
            expanded === 'panel8' ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
          }
          aria-controls="panel6bh-content"
          id="panel6bh-header"
          style={{
            borderBottom: '1px solid #848EA1'
          }}
        >
          <FooterListTitle aria-label="Follow Us">{Streams.FOLLOWUS}</FooterListTitle>
        </AccordionSummary>

        <AccordionDetails aria-label="Follow Us Details">
          <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ maxWidth: '170px', padding: '10px 0px' }}>
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

            <Link href="https://in.linkedin.com/company/college-suggest-india" target="_blank" aria-label="LinkedIn">
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
            <Link href="https://www.facebook.com/CollegeSuggestIndia" target="_blank" aria-label="FaceBook">
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FooterMobile;
