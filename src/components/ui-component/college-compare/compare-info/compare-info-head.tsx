import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import CommitOutlinedIcon from '@mui/icons-material/CommitOutlined';

import infoStyles from './compareInfoStyles.module.css';

const CompareInfoHead = ({
  open,
  setOpen,
  title
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  title: string;
}) => {
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box className={infoStyles.CompareInfoHead}>
        <Typography variant="h3">{title}</Typography>
        <Button variant="text" className={`${open && infoStyles.active} ${infoStyles.GraphBtn}`} onClick={handleOpen}>
          <CommitOutlinedIcon /> <span className={infoStyles.mobHide}>Graphs</span>
        </Button>
      </Box>
    </>
  );
};

export default CompareInfoHead;
