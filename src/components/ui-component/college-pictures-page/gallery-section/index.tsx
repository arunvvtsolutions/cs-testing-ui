import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Typography, Box } from '@mui/material';

import styles from './gallery.module.css';
import { GalleryContent } from './constant';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface GalleryImage {
  title: string;
  images: string[];
}
interface IImageDataProps {
  shortName: string;
  gallery: GalleryImage[];
}
export interface ICollegeImageProps extends IErrorProps {
  collegeImagesData: IImageDataProps;
}

const GallerySection: React.FC<ICollegeImageProps> = ({ collegeImagesData, hasError }) => {
  const slider = React.useRef<Slider | null>(null);

  //react-slick settings
  const sliderSettings = {
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
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
          slidesToShow: 1.02,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box className={styles.mainContainer}>
      <Box className="emptyCard">
        {hasError ? (
          <ErrorComponent />
        ) : (
          <>
            {collegeImagesData.gallery && collegeImagesData.gallery.length > 0 ? (
              <>
                <Box className="cardHead">
                  <Typography className="cg_InnerTitleTxt">
                    {collegeImagesData.shortName} {GalleryContent.IMAGES}
                  </Typography>
                </Box>
                {collegeImagesData.gallery.map((imageData, index) => (
                  <MainCard title={<Typography className="subHeadText">{imageData.title}</Typography>} key={index}>
                    <Box>
                      <Box className={styles.swiperBox}>
                        <Slider ref={slider} {...sliderSettings}>
                          {imageData.images.map((item, index) => {
                            return (
                              <>
                                <Box className="sliderColumn" key={index}>
                                  <Box className={styles.cards}>
                                    <Box className={styles.cardImage}>
                                      <Image
                                        className={styles.collegeImage}
                                        layout="responsive"
                                        width={100}
                                        height={100}
                                        src={`/assets/images/college-images/${item}`}
                                        alt={imageData.title}
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
                ))}
              </>
            ) : (
              <div>{GalleryContent.NO_PICTURES}</div>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default GallerySection;
