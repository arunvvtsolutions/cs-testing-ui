import React, { useState } from 'react';
import { Box } from '@mui/material';

import styles from './OverviewCard.module.css';

import CustomReadMoreOrLess from 'ui-component/common/readmoreorless';

interface CardProps {
  contentHeight?: string;
  data?: React.ReactNode;
}

const OverviewCard: React.FC<CardProps> = ({ data, contentHeight }) => {
  const [showAllUpdates, setShowAllUpdates] = useState(false);

  const toggleShowAllUpdates = () => {
    setShowAllUpdates(!showAllUpdates); //function to toggle Read More or Read Less
  };

  return (
    <>
      <Box className={styles.mainContent}>
        <Box
          className={showAllUpdates ? styles.expandBoxactive : styles.expandBox}
          style={{ maxHeight: showAllUpdates ? 'none' : contentHeight, marginBottom: '15px' }}
        >
          {/*Display data from parent component*/}
          <Box> {data}</Box>
        </Box>
        <CustomReadMoreOrLess show={showAllUpdates} onClick={toggleShowAllUpdates} />
      </Box>
    </>
  );
};

export default OverviewCard;
