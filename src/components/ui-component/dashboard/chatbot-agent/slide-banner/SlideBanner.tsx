'use client';
import { Box } from '@mui/material';
import React, { FC } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

import styles from '../styles.module.css';

import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

// import banImg from './img/ban.jpg';

export interface IPropslideBanner {
  id: number;
  name: string;
}
export interface IPropslideBannerData extends IErrorProps {
  sliderData: IPropslideBanner[];
}

const SlideBanner: FC<IPropslideBannerData> = ({ sliderData, hasError }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <Box className={styles.bannerBlock}>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Slider {...settings} className={styles.customSlickSlider}>
          {sliderData.map((sliderData, index) => {
            return (
              <Box className="sliderColumn" key={index}>
                <Box className={styles.imgBlock}>
                  <Image src={`/assets/images/state-wise-banner/${sliderData.name}`} alt="" fill={true} />
                </Box>
              </Box>
            );
          })}
        </Slider>
      )}
    </Box>
  );
};

export default SlideBanner;
