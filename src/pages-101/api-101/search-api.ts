/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${Api.searchColleges}`);

    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(error);
    res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
  }
}
