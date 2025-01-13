/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { BottomNavigation, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MobileMenuList =  dynamic(() => import( './MobileMenuList'));
import dynamic from 'next/dynamic';

import { MobileMenuWarp, TabStrip, TabBody, DrawerContent, CustomBottomNavigationAction } from './styles';

const SearchBar=  dynamic(() => import( 'ui-component/home/banner-page/Searchbar'));
import {
  CardImage,
  Cards,
  BlogImage,
  CardBox,
  CardTitles,
  InnerCardBox,
  DateTxt,
  ArrowImage
} from 'ui-component/home/Blogs/styles';
import { cardDetails } from 'ui-component/home/Blogs/CardDetails';
import { SearchCollegeData } from 'ui-component/home/banner-page/Searchbar';

const MobileMenu = () => {
  const theme = useTheme();
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));

  const [activeTab, setActiveTab] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [searchData, setSearchData] = useState<SearchCollegeData[]>([]);

  // for fetching search data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/search-api');

        if (response.ok) {
          const data = await response.json();
          setSearchData(data);
        } else {
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  // Add scroll event listener when the component mounts
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setScrolling(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleNavButtonClick = (tabIndex: number) => {
    if (activeTab === tabIndex) {
      setIsDrawerOpen(!isDrawerOpen);
    } else {
      setActiveTab(tabIndex);
      setIsDrawerOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {matchDownlg && (
        <>
          <MobileMenuWarp scrolling={scrolling}>
            <BottomNavigation
              style={{ position: 'relative', height: '50px !important' }}
              value={activeTab}
              onChange={(event, newValue) => handleNavButtonClick(newValue)}
            >
              <CustomBottomNavigationAction label="Menu" showLabel icon={<MenuIcon />} />

              <CustomBottomNavigationAction label="Search" showLabel icon={<SearchIcon />} />

{/* NOTE:Blog tab menu and mockup data ois hidden below for while */}
              <CustomBottomNavigationAction style={{display:"none"}} label="Blog" showLabel icon={<LibraryBooksOutlinedIcon />} />
            </BottomNavigation>
          </MobileMenuWarp>

          <Drawer anchor="bottom" open={isDrawerOpen} onClose={handleDrawerClose} style={{ zIndex: '1600' }}>
            <DrawerContent>
              {activeTab === 0 && (
                <TabBody>
                  <TabStrip>
                    Menu
                    <CloseIcon onClick={handleDrawerClose} />
                  </TabStrip>

                  <MobileMenuList handleDrawerClose={handleDrawerClose}/>
                </TabBody>
              )}

              {activeTab === 1 && (
                <TabBody>
                  <TabStrip>
                    Search <CloseIcon onClick={handleDrawerClose} />
                  </TabStrip>
                  <SearchBar searchData={searchData} handleDrawerClose={handleDrawerClose}/>
                </TabBody>
              )}

              {activeTab === 2 && (
                <TabBody>
                  <TabStrip>
                    Blog <CloseIcon onClick={handleDrawerClose} />
                  </TabStrip>

                  {cardDetails.map((CardDetail, index) => (
                    <Cards style={{ marginBottom: '20px' }} key={index}>
                      <CardImage>
                        <BlogImage src={CardDetail.img} alt={`Blog Image ${index + 1}`} />
                      </CardImage>
                      <CardBox>
                        <CardTitles>{CardDetail.title}</CardTitles>
                        <InnerCardBox>
                          <DateTxt>{CardDetail.date}</DateTxt>
                          <ArrowImage href="#">
                            <NavigateNextIcon />
                          </ArrowImage>
                        </InnerCardBox>
                      </CardBox>
                    </Cards>
                  ))}
                </TabBody>
              )}
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
};

export default MobileMenu;
