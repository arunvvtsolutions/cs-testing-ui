import React from 'react';
import { Box } from '@mui/material';

import styles from './mapSection.module.css';

import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

// Use the Data interface
export interface IMapData {
  url: string;
}

export interface IMapProps extends IErrorProps {
  mapData: IMapData;
}

const MapSection: React.FC<IMapProps> = ({ mapData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        mapData.url !== '' && (
          <Box className={styles.mapContainer}>
            <Box className={styles.gmapCanvas} data-test-id="map-section" aria-hidden="true">
              <iframe src={mapData.url}></iframe>
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default MapSection;
