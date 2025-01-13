/**
 * axios setup to use mock service
 */
'use client';
import axios from 'axios';

import { getCookieToken } from 'utils';

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.request.use((config) => {
  const token = getCookieToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosServices;
