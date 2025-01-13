import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import parser from 'html-react-parser';

import classes from './amenitiesDesc.module.css';

import { ContainerWarp } from 'ui-component/home/explore-by-stream/styles';
import MainCard from 'ui-component/MainCard';
import CustomReadMoreOrLess from 'ui-component/common/readmoreorless';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IDescData {
  title: string;
  image?: string;
  description: string;
}

export interface IDescDataProps extends IErrorProps {
  descData: IDescData[];
}

const AmenitiesDescription: React.FC<IDescDataProps> = ({ descData, hasError }) => {
  const [openBoxes, setOpenBoxes] = useState(new Array(descData.length).fill(false));

  // Toggle the open state for a specific card at the given index
  const handleOpen = (index: number) => {
    const updatedOpenBoxes = [...openBoxes];
    updatedOpenBoxes[index] = !updatedOpenBoxes[index];
    setOpenBoxes(updatedOpenBoxes);
  };

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <ContainerWarp data-test-id="amenities-description">
          {descData &&
            descData.map((desc, index) => {
              if (desc.description.trim() === '') {
                return <></>;
              }
              return (
                <MainCard key={index} className={classes.mainWarp} data-test-id={`descData-${index}`}>
                  <Box className={openBoxes[index] ? classes.descBlockactive : classes.descBlock}>
                    <Box className={classes.descBlockHead}>
                      <Box className={classes.IcnBx}>
                        <Image
                          src={`/assets/images/amenities-description/${desc?.image}`}
                          width={100}
                          height={100}
                          alt={desc?.title}
                          data-test-id={`desc-${desc.image}`}
                        />
                      </Box>
                      <Typography variant="h4" className={classes.title}>
                        {desc?.title}
                      </Typography>
                    </Box>

                    <Typography className="custompara">{parser(desc?.description)}</Typography>
                  </Box>
                  {/* Pass the index to handleOpen so it knows which card to toggle */}
                  <Box className={classes.mobileReadBx}>
                    <CustomReadMoreOrLess show={openBoxes[index]} onClick={() => handleOpen(index)} />
                  </Box>
                </MainCard>
              );
            })}
        </ContainerWarp>
      )}
    </>
  );
};

export default AmenitiesDescription;
