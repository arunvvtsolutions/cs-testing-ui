import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Typography, Button } from '@mui/material';

import { ViewAll } from '../../../../constants';

import styles from './ProfessorsList.module.css';
import { ProfessorsListTitle } from './constant';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IListProps {
  name: string;
  qualification: string;
}

export interface IProfessorProps extends IErrorProps {
  listData: IListProps[];
}

const ProfessorsList: React.FC<IProfessorProps> = ({ listData, hasError }) => {
  const [listShow, setListShow] = useState(false);

  const toggleAllProfessors = () => {
    setListShow(!listShow);
  };

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        listData.length > 0 && (
          <MainCard
            data-test-id=" professors-list"
            title={<Typography className="subHeadText">{ProfessorsListTitle.LIST_OF_PROFESSORS}</Typography>}
          >
            <Box className={listShow ? styles.mainListCardactive : styles.mainListCard}>
              {listData.map((professor, index) => (
                <Box key={index} className={styles.subListCard}>
                  <Typography className={styles.professorName}>{professor.name}</Typography>
                  <Typography className={styles.qualification}>{professor.qualification}</Typography>
                </Box>
              ))}
            </Box>
            <Button
              data-test-id="professors-list-viewall"
              className={styles.viewallButton}
              variant="outlined"
              onClick={toggleAllProfessors}
            >
              {listShow ? ViewAll.VIEW_LESS : ViewAll.VIEW_ALL}
              <Typography className={styles.viewallText}>
                <KeyboardArrowRightIcon className={styles.viewallArrow} />
              </Typography>
            </Button>
          </MainCard>
        )
      )}
    </>
  );
};

export default ProfessorsList;
