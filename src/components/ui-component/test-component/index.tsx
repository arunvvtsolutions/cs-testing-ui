'use client';

import React, { useEffect } from 'react';

import axiosServices from 'utils/axios';

const TestComp = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axiosServices.get('/api/profile');
        console.log(data.data, 'data');
      } catch (error) {
        console.log(error, 'error');
      }
    };
    getData();
  }, []);
  return <div>TestComp</div>;
};

export default TestComp;
