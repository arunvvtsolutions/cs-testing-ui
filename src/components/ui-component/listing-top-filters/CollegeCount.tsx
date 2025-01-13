import React from 'react';

import { CountBx } from './styles';
const CollegeCount = ({ count }: { count: number }) => {
  return (
    <div>
      <CountBx>Total College {count}</CountBx>
    </div>
  );
};

export default CollegeCount;
