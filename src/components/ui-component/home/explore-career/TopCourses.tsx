'use client';
import React, { useState } from 'react';

import { CardBox, Cards, CardTitle, LinkBox, OrderList, LinkItemsBox } from './styles';
import CardButton from './CardButton';
import { coursesList } from './Colleges';
import { AllCardTitles, ButtonName } from './constant';

const TopCourses: React.FC = () => {
  const [scroll, setScroll] = useState(false);

  const handleButtonClick = () => {
    setScroll(!scroll);
  };

  return (
    <Cards>
      <CardTitle scroll={scroll}>{AllCardTitles.TOP_COURSES_TO_STUDY}</CardTitle>
      <CardBox scroll={scroll}>
        <OrderList scroll={scroll}>
          {coursesList.map((item) => (
            <LinkItemsBox disablePadding key={item.id}>
              <LinkBox href={item.links} prefetch={false}>
                {item.name}
              </LinkBox>
            </LinkItemsBox>
          ))}
        </OrderList>
      </CardBox>
      <CardButton buttonProps={handleButtonClick} scroll={scroll} butonName={ButtonName.COURSE_BTN_NAME} />
    </Cards>
  );
};
export default TopCourses;
