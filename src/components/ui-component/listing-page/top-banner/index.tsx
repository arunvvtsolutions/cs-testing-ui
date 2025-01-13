import { useEffect, useState } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import parser from 'html-react-parser';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';

import { ReadMoreOrLess } from '../../../../constants';

import {
  BannerContainer,
  BannerSection,
  BannerHeading,
  ImageGrid,
  HeadingGrid,
  ContentGrid,
  ButtonText,
  ToggleButton,
  FlotContent,
  ImageBox,
  ButtonBox,
  ContentBox,
  EntireBox,
  TagButton
} from './style';

const TopBanner = ({ title, readMoreContent }: { title: string; readMoreContent?: string }) => {
  const [fullText, setFullText] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const toggleShowFullText = () => {
    setFullText((prev) => !prev);
    window.scroll(0, 0);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setScrolling(prevScrollPos < currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  console.log(scrolling, 'scrolling');

  return (
    <BannerSection data-test-id="listing-page-top-banner">
      <EntireBox showfulltext={fullText}>
        <BannerContainer showfulltext={fullText}>
          <Grid container>
            <HeadingGrid item container xs={12} lg={7} md={7}>
              <Box>
                <BannerHeading variant="h1">{title}</BannerHeading>
              </Box>
            </HeadingGrid>
            <ImageGrid item container xs={12} lg={5} md={5}>
              <ImageBox>
                <Image src="/assets/images/banner_img.webp" width={380} height={296} alt="campus" />
              </ImageBox>
            </ImageGrid>
          </Grid>
        </BannerContainer>
        {/* hidden for whle */}
        {readMoreContent && (
          <ContentGrid container showfulltext={fullText}>
            <ContentBox>
              <FlotContent showfulltext={fullText} className="cgDynamicText cgTable">
                <Box className="tableWrapper">{readMoreContent && parser(readMoreContent)}</Box>
              </FlotContent>
              <ButtonBox showfulltext={fullText} scrolling={fullText && scrolling}>
                <ToggleButton
                  onClick={toggleShowFullText}
                  showfulltext={fullText}
                  data-test-id="listing-page-top-banner-readmore"
                >
                  {mdDown ? (
                    !fullText && (
                      <ButtonText>{fullText ? ReadMoreOrLess.READ_LESS : ReadMoreOrLess.READ_MORE}</ButtonText>
                    )
                  ) : (
                    <ButtonText>{fullText ? ReadMoreOrLess.READ_LESS : ReadMoreOrLess.READ_MORE}</ButtonText>
                  )}

                  <TagButton showfulltext={fullText}>
                    <KeyboardArrowDownIcon sx={{ color: '#119D78', verticalAlign: 'middle' }} />
                  </TagButton>
                </ToggleButton>
              </ButtonBox>
            </ContentBox>
          </ContentGrid>
        )}
      </EntireBox>
    </BannerSection>
  );
};
export default TopBanner;
