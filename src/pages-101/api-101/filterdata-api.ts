/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { Stream } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { collegeUrl, courseName } = req.query;
  const data: any = {
    hasError: false,
    filteredData: {
      caste: [],
      gender: [],
      quota: []
    },
    cutoff: {
      years: [],
      results: []
    },
    filterState: {
      caste: [],
      gender: [],
      quota: []
    }
  };
  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;
  try {
    const casteRes = await fetch(
      `${API_BASE_URL}/${Stream.ENGINEERING}/${Api.collegeCourseAndFeesCutoffCaste}/${collegeUrl}/${courseName}`
    );
    const quotaRes = await fetch(
      `${API_BASE_URL}/${Stream.ENGINEERING}/${Api.collegeCourseAndFeesCutoffQuota}/${collegeUrl}/${courseName}`
    );
    const genderRes = await fetch(
      `${API_BASE_URL}/${Stream.ENGINEERING}/${Api.collegeCourseAndFeesCutoffGender}/${collegeUrl}/${courseName}`
    );
    const cutoffRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeCourseAndFeesCutoff}/${collegeUrl}/${courseName}`
    );

    if (casteRes.ok) {
      const casteResponse = await casteRes.json();
      data.filteredData.caste = casteResponse;
    }
    if (quotaRes.ok) {
      const quotaResponse = await quotaRes.json();
      data.filteredData.quota = quotaResponse;
    }
    if (genderRes.ok) {
      const genderResponse = await genderRes.json();
      data.filteredData.gender = genderResponse;
    }
    if (cutoffRes.ok) {
      const cutoffResponse = await cutoffRes.json();

      data.cutoff = cutoffResponse;
    }
    res.status(genderRes.status).json(data);
  } catch (error) {
    data.hasError = true;
    res.status(500).json({ error: data });
  }
}
