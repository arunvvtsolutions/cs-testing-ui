'use client';

import Toolbar from '@mui/material/Toolbar';
import { Box, List, ListItem } from '@mui/material';
import '../../../../styles/Home.module.css';
import React from 'react';
import dynamic from 'next/dynamic';

const Image = dynamic(() => import('next/image'));
const EngineeringLinklist = dynamic(() => import('./EngineeringLinkList'));
const DentalLinklist = dynamic(() => import('./DentalLinkList'));
const ArchitectureLinklist = dynamic(() => import('./ArchitectureLinkList'));
const PharmacyLinklist = dynamic(() => import('./PharmacyLinkList'));
const ExamsLinklist = dynamic(() => import('./ExamsLinkList'));
const PredictorsLinklist = dynamic(() => import('./Predictors'));
const MedicalLinklist = dynamic(() => import('./MedicalLinkList'));
const Link = dynamic(() => import('next/link'));
import { MainLinks } from './styles';
const Profile = dynamic(() => import('./Profile'));

import { BASE_URL } from 'config';

const Navbar: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1264px',
          margin: 'auto',
          padding: '5px 10px'
        }}
      >
        <Toolbar
          sx={{
            padding: { xs: '0px 0px !important', sm: '0px 0px !important' },
            margin: 'auto',
            width: '100%'
          }}
        >
          <Link href={`${BASE_URL}`} className="logo_Box" prefetch={false}>
            <Image src="/assets/images/logo.webp" alt="logo" width={100} height={100} loading="lazy" />
          </Link>

          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', sm: 'none', lg: 'flex' },
              justifyContent: 'center'
            }}
          >
            <List
              component="ul"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0px 10px',
                position: 'relative'
              }}
            >
              <ListItem component="li" className="navRight" disablePadding>
                <MainLinks href={`${BASE_URL}`} rel="noopener" prefetch={false}>
                  Home
                </MainLinks>
              </ListItem>

              <EngineeringLinklist />
              <MedicalLinklist />
              <DentalLinklist />
              <ArchitectureLinklist />
              <PharmacyLinklist />
              <ExamsLinklist />
              <PredictorsLinklist />
            </List>
          </Box>

          <Profile />
        </Toolbar>
      </Box>
    </>
  );
};

export default Navbar;
