'use client';
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { CardBox, Cards, CardTitle, LinkBox } from './styles';
import CardButton from './CardButton';
import { listname } from './Colleges';
import { AllCardTitles, ButtonName } from './constant';

const TopCollege = () => {
  const [scroll, setScroll] = useState(false);

  const handleButtonClick = () => {
    setScroll(!scroll);
  };

  return (
    <Cards>
      <CardTitle scroll={scroll}>{AllCardTitles.TOP_COLLEGES_IN_INDIA}</CardTitle>
      <CardBox scroll={scroll}>
        <List>
          {listname.map((item) => (
            <ListItem disablePadding key={item.id}>
              <LinkBox href={item.links} prefetch={false}>
                {item.name}
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </CardBox>
      <CardButton buttonProps={handleButtonClick} scroll={scroll} butonName={ButtonName.COLLEGE_BTN_NAME} />
    </Cards>
  );
};

export default TopCollege;
