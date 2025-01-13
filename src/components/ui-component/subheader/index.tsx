'use client';

import React, { useEffect, useState } from 'react';
import { Tabs } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import styled from '@mui/system/styled';
import { useParams, usePathname } from 'next/navigation';

import SubmenuClasses from './subHeader.module.css';

import { IErrorProps, IInnerPageParams } from 'types';

export interface ISubMenu {
  menuId: number;
}
export interface ISubMenuProps extends IErrorProps {
  subMenu?: ISubMenu[];
}
const SubHeader: React.FC<ISubMenuProps> = ({ subMenu }) => {
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;
  const asPath = usePathname();

  const [value, setValue] = React.useState(0);
  const [navStyle, setNavStyle] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    scrollY > 50 ? setNavStyle(true) : setNavStyle(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // submenu z-index tranision ends here

  const InnerPageLinsk = [
    {
      linkId: 1,
      linkName: 'Overview',
      linkUrl: 'overview'
    },
    {
      linkId: 2,
      linkName: 'Course & Fees',
      linkUrl: 'course-fees'
    },
    {
      linkId: 13,
      linkName: 'Affiliated Colleges',
      linkUrl: 'affiliated-college'
    },
    {
      linkId: 4,
      linkName: 'Placements',
      linkUrl: 'placement'
    },
    {
      linkId: 8,
      linkName: 'Student Strength',
      linkUrl: 'student-strength'
    },
    {
      linkId: 3,
      linkName: 'Admission & Eligibility',
      linkUrl: 'admission-eligibility'
    },
    {
      linkId: 5,
      linkName: 'Amenities',
      linkUrl: 'amenities'
    },
    {
      linkId: 6,
      linkName: 'Cutoff',
      linkUrl: 'cutoff'
    },
    {
      linkId: 7,
      linkName: 'Faculty',
      linkUrl: 'faculty'
    },
    {
      linkId: 9,
      linkName: 'Review',
      linkUrl: 'review'
    },
    {
      linkId: 10,
      linkName: 'Pictures',
      linkUrl: 'pictures'
    },
    {
      linkId: 11,
      linkName: 'Q&A',
      linkUrl: 'questions'
    },
    {
      linkId: 12,
      linkName: 'Contact',
      linkUrl: 'contact'
    }
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const CustomTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .MuiTabScrollButton-horizontal ': {
      position: 'absolute',
      top: '45%',
      transform: 'translateY(-50%)',
      padding: '0px 10px',
      borderRadius: '100px'
    },
    '& .css-1l4gzjr': {
      borderBottom: 'transparent !important'
    },
    '& .MuiTabs-scrollButtons:first-of-type': {
      left: '-20px'
    },
    '& .MuiTabs-scrollButtons:last-of-type': {
      right: '-30px'
    },
    [theme.breakpoints.down('lg')]: {
      '& .MuiTabScrollButton-horizontal': {
        display: 'none'
      }
    },
    // borderTop: '1px solid #F5F5F7 !important',
    // borderBottom: '1px solid #F5F5F7 !important',
    justifyContent: 'flex-start',
    width: '100%',
    padding: '15px 0px',
    '& .css-angn3u-MuiTabs-flexContainer': {
      justifyContent: 'flex-start !important',
      borderBottom: 'transparent !important'
    },
    [theme.breakpoints.down('md')]: {
      padding: '12px 10px !important'
    }
  }));

  return (
    <>
      <Box
        className={
          navStyle ? `${SubmenuClasses.SubHeaderBox} ${SubmenuClasses.active}` : `${SubmenuClasses.SubHeaderBox}`
        }
      >
        <Box className={SubmenuClasses.SubHeaderWrap}>
          <CustomTabs
            className={SubmenuClasses.CustomTabs}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="submenu for college-university"
          >
            {InnerPageLinsk.map((links) => {
              return (
                <>
                  {!subMenu?.some((menu) => menu.menuId === links.linkId) && (
                    <Link
                      className={`${SubmenuClasses.SubMenuTab} ${
                        asPath?.includes(`/${ins}/${name}/${links.linkUrl}`) ? SubmenuClasses.subnavactive : ''
                      }`}
                      key={links.linkId}
                      href={`/${ins}/${name}/${links.linkUrl}`}
                      as={`/${ins}/${name}/${links.linkUrl}`}
                    >
                      {links.linkName}
                    </Link>
                  )}
                </>
              );
            })}
          </CustomTabs>
        </Box>
      </Box>
    </>
  );
};

export default SubHeader;
