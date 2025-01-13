'use client';
import { useState } from 'react';

import { CardBox, Cards, CardTitle, LinkBox, OrderList, LinkItemsBox } from './styles';
import CardButton from './CardButton';
import { PlacesList } from './Colleges';
import { AllCardTitles, ButtonName } from './constant';

const TopPlaces = () => {
  const [scroll, setScroll] = useState(false);

  const handleButtonClick = () => {
    setScroll(!scroll);
  };

  return (
    <Cards>
      <CardTitle scroll={scroll}>{AllCardTitles.TOP_PLACES_TO_STUDY}</CardTitle>
      <CardBox scroll={scroll}>
        <OrderList scroll={scroll}>
          {PlacesList.map((item) => (
            <LinkItemsBox disablePadding key={item.id}>
              <LinkBox href={item.links} prefetch={false}>
                {item.name}
              </LinkBox>
            </LinkItemsBox>
          ))}
        </OrderList>
        <CardButton buttonProps={handleButtonClick} scroll={scroll} butonName={ButtonName.PLACES_BTN_NAME} />
      </CardBox>
    </Cards>
  );
};

export default TopPlaces;
