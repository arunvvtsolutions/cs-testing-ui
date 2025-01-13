import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePathname } from 'next/navigation';

import { ReadMoreOrLess } from '../../../../constants';

import styles from './Readmoreorless.module.css';
interface ReadMoreOrLessProps {
  show: boolean;
  onClick: () => void;
}
const CustomReadMoreOrLess: React.FC<ReadMoreOrLessProps> = ({ show, onClick }) => {
  const [activePage, setActivePage] = useState<string>('');
  const asPath = usePathname();
  const segments = asPath?.split('/');
  useEffect(() => {
    const activePageName = segments?.[segments.length - 1];
    activePageName && setActivePage(activePageName);
  }, [segments]);

  return (
    <>
      <Button className={styles.readMoreorLessButton} onClick={onClick} data-test-id={`${activePage}-readmore`}>
        {show ? ReadMoreOrLess.READ_LESS : ReadMoreOrLess.READ_MORE}
        <Typography className={styles.readMoreorLessText}>
          <KeyboardArrowDownIcon
            className={`${styles.readMoreorLessArrow} ${show ? styles.rotate : ''}`}
            onClick={onClick}
          />
        </Typography>
      </Button>
    </>
  );
};
export default CustomReadMoreOrLess;
