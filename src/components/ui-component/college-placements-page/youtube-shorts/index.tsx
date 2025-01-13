import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import Slider from 'react-slick';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import UtubeClasses from './youtube-shorts.module.css';
import { ShortTitle } from './constant';

import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IYoutubeDataProps {
  id: number;
  url: string;
}

export interface IYoutubeProps extends IErrorProps {
  youtubeData: IYoutubeDataProps[];
}

const YoutubeShorts: FC<IYoutubeProps> = ({ youtubeData, hasError }) => {
  const slider = React.useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);

  const extractVideoId = (url: string): string => {
    const match = url.match(/\/embed\/([\w-]{11})/);
    return match ? match[1] : '';
  };
  // react-slick settings
  const sliderSettings = {
    infinite: false,
    speed: 300,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
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
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          {youtubeData.length > 0 && (
            <ContainerWrapper>
              <Box className="emptyCard" data-test-id="placements-youtube">
                <Box className="cardHead" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography className="cg_InnerTitleTxt">{ShortTitle.WATCH_OUT_OUR_SHORTS}</Typography>
                </Box>
                <MainCard>
                  <Box className="ReviewSecBody">
                    <Box className={UtubeClasses.relBox}>
                      <Slider ref={slider} {...sliderSettings}>
                        {youtubeData.map((shorts) => (
                          <Box
                            className="sliderColumn"
                            key={shorts.id}
                            style={{ marginRight: '10px' }}
                            data-test-id={`youtube-shorts-${shorts.id}`}
                          >
                            <Box className={UtubeClasses.youtubeCard}>
                              <Box className={UtubeClasses.uTubeWarp}>
                                <LiteYouTubeEmbed
                                  aspectHeight={9}
                                  aspectWidth={16}
                                  id={extractVideoId(shorts.url) || ''}
                                  title={'YouTube Video Player' || ''}
                                ></LiteYouTubeEmbed>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Slider>
                      <Box display="flex" justifyContent="flex-end" gap={2} mb={0} className="mobArrowCover">
                        <Box
                          onClick={handleNext}
                          className={`slideBtn shortsArrows ryt ${
                            currentSlide === youtubeData.length - 1 ? 'disabled' : ''
                          } `}
                          aria-label="Shorts Next Slide"
                          role="button"
                        >
                          <KeyboardArrowRightIcon />
                        </Box>
                        <Box
                          onClick={handlePrev}
                          className={`slideBtn shortsArrows lft ${currentSlide === 0 ? 'disabled' : ''}  `}
                          aria-label="Shorts Previous Slide"
                          role="button"
                        >
                          <KeyboardArrowLeftIcon />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </MainCard>
              </Box>
            </ContainerWrapper>
          )}
        </>
      )}
    </>
  );
};

export default YoutubeShorts;
