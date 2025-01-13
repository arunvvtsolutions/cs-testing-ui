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
import Link from 'next/link';

import { Streams, LandingConst, Exams, OtherLinks } from '../../../../constants';

import { MobileListTitle, MobileListWarp, MobileListItem, MobileLinks } from './styles';

import { BASE_URL, ENGINEERING_BASE_URL, MEDICAL_BASE_URL } from 'config';

const MobileMenuList = ({ handleDrawerClose }: { handleDrawerClose: () => void }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordiunStyle = {
    background: '#fff',
    margin: '0px !important'
  };

  const accordiunHead = {
    minheight: '0 !Important',
    '   $.MuiAccordionSummary-content Mui-expanded MuiAccordionSummary-contentGutters css-o4b71y-MuiAccordionSummary-content ':
      {
        minHeight: '0px'
      }
  };

  return (
    <div>
      <Accordion sx={accordiunStyle} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={expanded === 'panel1' ? <RemoveIcon /> : <AddIcon />}
          sx={accordiunHead}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{
            borderBottom: '1px solid rgba(32, 33, 36, 0.20)'
          }}
        >
          <MobileListTitle expanded={expanded === 'panel1'}>{Streams.ENGINEERING}</MobileListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <MobileListWarp aria-label="basic-list">
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/iit/engineering/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_IIT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/nit/engineering/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_NIT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/iiit/engineering/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_IIIT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/gfti/engineering/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_GFTI_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/government/engineering/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/private/engineering/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/engineering/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_ENGINEERING_COLLEGES}
              </MobileLinks>
            </MobileListItem>
          </MobileListWarp>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={accordiunStyle} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={expanded === 'panel2' ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          style={{
            borderBottom: '1px solid rgba(32, 33, 36, 0.20)'
          }}
        >
          <MobileListTitle expanded={expanded === 'panel2'}>{Streams.ARCHITECTURE}</MobileListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <MobileListWarp aria-label="basic-list">
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/iit/architecture/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_IIT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/nit/architecture/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_NIT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/government/architecture/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/10/private/architecture/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${ENGINEERING_BASE_URL}/top/architecture/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_ARCHITECTURE_COLLEGES}
              </MobileLinks>
            </MobileListItem>
          </MobileListWarp>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={accordiunStyle}>
        <AccordionSummary
          expandIcon={expanded === 'panel3' ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          style={{
            borderBottom: '1px solid rgba(32, 33, 36, 0.20)'
          }}
        >
          <MobileListTitle expanded={expanded === 'panel3'}>{Streams.MEDICAL}</MobileListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <MobileListWarp aria-label="basic-list">
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/10/government/medical/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/10/private/medical/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/medical/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_MEDICAL_COLLEGES}
              </MobileLinks>
            </MobileListItem>
          </MobileListWarp>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={accordiunStyle}>
        <AccordionSummary
          expandIcon={expanded === 'panel4' ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          style={{
            borderBottom: '1px solid rgba(32, 33, 36, 0.20)'
          }}
        >
          <MobileListTitle expanded={expanded === 'panel4'}>{Streams.DENTAL}</MobileListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <MobileListWarp aria-label="basic-list">
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/10/government/dental/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/10/private/dental/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/dental/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_DENTAL_COLLEGES}
              </MobileLinks>
            </MobileListItem>
          </MobileListWarp>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} sx={accordiunStyle}>
        <AccordionSummary
          expandIcon={expanded === 'panel5' ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
          style={{
            borderBottom: '1px solid rgba(32, 33, 36, 0.20)'
          }}
        >
          <MobileListTitle expanded={expanded === 'panel5'}>{Streams.PHARMACY}</MobileListTitle>
        </AccordionSummary>
        <AccordionDetails>
          <MobileListWarp aria-label="basic-list">
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/10/government/pharmacy/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/10/private/pharmacy/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_10_PRIVATE_COLLEGES}
              </MobileLinks>
            </MobileListItem>
            {/* <MobileListItem>
              <MobileLinks href="/pharmacy/top/10/deemed/colleges-in-india">
                Top 10 Deemed Colleges In India
                {LandingConst.Top_10_DEEMED_COLLEGES_IN_INDIA}
              </MobileLinks>
            </MobileListItem> */}
            <MobileListItem>
              <MobileLinks
                href={`${MEDICAL_BASE_URL}/top/pharmacy/colleges-in-india`}
                onClick={handleDrawerClose}
                prefetch={false}
              >
                {LandingConst.TOP_PHARMACY_COLLEGES}
              </MobileLinks>
            </MobileListItem>
          </MobileListWarp>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
        sx={{ ...accordiunStyle, display: 'none' }}
      >
        <AccordionSummary
          expandIcon={expanded === 'panel6' ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
          style={{
            borderBottom: '1px solid rgba(32, 33, 36, 0.20)'
          }}
        >
          <MobileListTitle expanded={expanded === 'panel6'}>{Streams.TOPEXAMS}</MobileListTitle>
        </AccordionSummary>

        <AccordionDetails>
          <MobileListWarp aria-label="basic-list">
            <MobileListItem>
              <MobileLinks href="#" onClick={handleDrawerClose}>
                {Exams.JEE_MAIN_EXAM}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks href="#" onClick={handleDrawerClose}>
                {Exams.VITEEE_ENTRANCE_EXAM}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks href="#" onClick={handleDrawerClose}>
                {Exams.JEE_ADVANCED}
              </MobileLinks>
            </MobileListItem>
          </MobileListWarp>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel7'}
        onChange={handleChange('panel7')}
        sx={{ accordiunStyle, display: 'none' }}
      >
        <AccordionSummary
          expandIcon={expanded === 'panel7' ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
          style={{
            borderBottom: '1px solid rgba(32, 33, 36, 0.20)'
          }}
        >
          <MobileListTitle expanded={expanded === 'panel7'}>{Streams.OTHERLINKS}</MobileListTitle>
        </AccordionSummary>

        <AccordionDetails>
          <MobileListWarp aria-label="basic-list">
            <MobileListItem>
              <MobileLinks href={`${BASE_URL}/about`} onClick={handleDrawerClose} prefetch={false}>
                {OtherLinks.ABOUT}
              </MobileLinks>
            </MobileListItem>
            <MobileListItem>
              <MobileLinks href={`${BASE_URL}/contact-us`} onClick={handleDrawerClose} prefetch={false}>
                {OtherLinks.CONTACT_US}
              </MobileLinks>
            </MobileListItem>
            {/* site-map hidden for while */}
            {/* <MobileListItem>
              <MobileLinks href="#" onClick={handleDrawerClose}>
                {OtherLinks.SITEMAP}
              </MobileLinks>
            </MobileListItem> */}
            {/* site-map hidden for while */}
            <MobileListItem>
              <MobileLinks href={`${BASE_URL}/privacy-policies`} onClick={handleDrawerClose} prefetch={false}>
                {OtherLinks.PRIVACY_TERMS}
              </MobileLinks>
            </MobileListItem>
          </MobileListWarp>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel8'}
        onChange={handleChange('panel8')}
        sx={{ accordiunStyle, display: 'none' }}
      >
        <AccordionSummary
          expandIcon={expanded === 'panel8' ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
          style={{
            borderBottom: '1px solid rgba(32, 33, 36, 0.20)'
          }}
        >
          <MobileListTitle expanded={expanded === 'panel8'}>{Streams.FOLLOWUS}</MobileListTitle>
        </AccordionSummary>

        <AccordionDetails>
          <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ maxWidth: '170px', padding: '10px 0px' }}>
            <Link href="https://www.youtube.com/@CollegeSuggest" target="_blank">
              <YouTubeIcon
                sx={{
                  color: '#9198A6',
                  '&:hover': {
                    color: '#fff'
                  }
                }}
              />
            </Link>

            <Link href="https://in.linkedin.com/company/college-suggest-india" target="_blank">
              <LinkedInIcon
                sx={{
                  color: '#9198A6',
                  '&:hover': {
                    color: '#fff'
                  }
                }}
              />
            </Link>

            <Link href="https://www.instagram.com/collegesuggestindia/?igshid=YmMyMTA2M2Y%3D" target="_blank">
              <InstagramIcon
                sx={{
                  color: '#9198A6',
                  '&:hover': {
                    color: '#fff'
                  }
                }}
              />
            </Link>

            <Link href="https://twitter.com/i/flow/login?redirect_after_login=%2Fsuggestcollege" target="_blank">
              <TwitterIcon
                sx={{
                  color: '#9198A6',
                  '&:hover': {
                    color: '#fff'
                  }
                }}
              />
            </Link>
            <Link href="https://www.facebook.com/CollegeSuggestIndia" target="_blank">
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

export default MobileMenuList;
