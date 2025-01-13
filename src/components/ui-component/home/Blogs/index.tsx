import React from 'react';
import Slider from 'react-slick';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { Blog } from './constant';
import {
  ArrowImage,
  BlogImage,
  BlogTitle,
  CardBox,
  CardImage,
  CardTitles,
  Cards,
  Container,
  InnerCardBox,
  Section,
  DateTxt
} from './styles';
import { cardDetails } from './CardDetails';

const Blogs: React.FC = () => {
  const theme = useTheme();
  const slider = React.useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);
  const matchDownUp = useMediaQuery(theme.breakpoints.up('md'));

  // react-slick settings
  const sliderSettings = {
    infinite: false,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.08,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1.08,
          slidesToScroll: 1
        }
      }
    ]
  };

  // navigate next btn
  const handleNext = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  // navigate prev btn
  const handlePrev = () => {
    if (slider.current) {
      slider.current.slickPrev();
    }
  };
  return (
    <Section>
      <Container>
        <BlogTitle>{Blog.BLOG_HEADING}</BlogTitle>

        {matchDownUp && (
          <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
            <Box onClick={handlePrev} className={`slideBtn ${currentSlide === 0 ? 'disabled' : ''}`}>
              <KeyboardArrowLeftIcon />
            </Box>
            <Box
              onClick={handleNext}
              className={`slideBtn ${currentSlide === cardDetails.length - 3 ? 'disabled' : ''}`}
            >
              <KeyboardArrowRightIcon />
            </Box>
          </Box>
        )}

        <Slider ref={slider} {...sliderSettings}>
          {cardDetails.map((cd, index) => {
            return (
              <>
                <Box className="sliderColumn" key={index} style={{ marginRight: '10px' }}>
                  <Cards>
                    <CardImage>
                      <BlogImage src={cd.img} alt={`Blog Image ${index + 1}`} />
                    </CardImage>
                    <CardBox>
                      <CardTitles>{cd.title}</CardTitles>
                      <InnerCardBox>
                        <DateTxt>{cd.date}</DateTxt>
                        <ArrowImage href="#">
                          <NavigateNextIcon />
                        </ArrowImage>
                      </InnerCardBox>
                    </CardBox>
                  </Cards>
                </Box>
              </>
            );
          })}
        </Slider>
      </Container>
    </Section>
  );
};

export default Blogs;
