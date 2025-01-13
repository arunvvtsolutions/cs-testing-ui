'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import { Typography, Box } from '@mui/material';
import { useParams } from 'next/navigation';

import { CollegeGalleryDetails } from './constant';
import overviewGallery from './Gallery.module.css';

import MainCard from 'ui-component/MainCard';
import { IErrorProps, IInnerPageParams } from 'types';
import ErrorComponent from 'ui-component/error';

interface IGalleryProps {
  title: string;
  image: string[];
}

interface IGalleryDataProps {
  shortName: string;
  gallery: IGalleryProps[];
}

export interface IGalleryImageProps extends IErrorProps {
  galleryImages: IGalleryDataProps;
}

const Gallery: React.FC<IGalleryImageProps> = ({ galleryImages, hasError }) => {
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;
  const slider = React.useRef<Slider | null>(null);
  //react-slick settings
  const sliderSettings = {
    infinite: true,
    speed: 1200,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.03,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          {galleryImages.gallery?.[0]?.image.length > 0 && (
            <MainCard
              data-test-id="overview-galary"
              title={
                <Typography className="subHeadText">
                  {galleryImages.shortName} {CollegeGalleryDetails.TITLE}
                </Typography>
              }
              secondary={
                <Link
                  className="linkTxt"
                  href={`/${ins}/${name}/pictures`}
                  as={`/${ins}/${name}/pictures`}
                  data-test-id="overview-galary-viewall"
                >
                  {CollegeGalleryDetails.VIEW_All_IMAGES}
                </Link>
              }
            >
              <Box>
                <Box className={overviewGallery.swiperBox}>
                  <Slider ref={slider} {...sliderSettings}>
                    {galleryImages.gallery[0].image.map((item, index) => {
                      return (
                        <>
                          <Box className="sliderColumn" key={index}>
                            <Box className={overviewGallery.cards}>
                              <Box className={overviewGallery.cardImage}>
                                <Image
                                  className={overviewGallery.galleryImage}
                                  layout="responsive"
                                  width={100}
                                  height={100}
                                  src={`/assets/images/college-images/${item}`}
                                  alt={'gallery-images'}
                                  data-test-id={`overview-galary-${item}`}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </>
                      );
                    })}
                  </Slider>
                </Box>
              </Box>
            </MainCard>
          )}
        </>
      )}
    </>
  );
};

export default Gallery;
