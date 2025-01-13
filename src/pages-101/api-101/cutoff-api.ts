/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { Stream } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { collegeUrl, courseId, casteId, genderId, quotaId } = req.query;

  try {
    const result = await fetch(
      `${API_BASE_URL}/${Stream.ENGINEERING}/${Api.collegeCutofResult}/${collegeUrl}/${courseId}/${casteId}/${genderId}/${quotaId}`
    );

    const data = await result.json();
    res.status(result.status).json(data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
  }
}
