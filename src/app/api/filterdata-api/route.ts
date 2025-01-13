/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { Stream } from 'types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const [collegeUrl, courseName] = [searchParams.get('collegeUrl'), searchParams.get('courseName')];
  const data: any = {
    hasError: false,
    filteredData: {
      caste: [],
      gender: [],
      quota: []
    },
    filterState: {
      caste: [],
      gender: [],
      quota: []
    },
    cutoff: {
      result: []
    }
  };

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
    const cutoff = await fetch(
      `${API_BASE_URL}/${Stream.ENGINEERING}/${Api.collegeCourseAndFeesCutoff}/${collegeUrl}/${courseName}`
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
    if (cutoff.ok) {
      const cutoffResponse = await cutoff.json();
      data.cutoff = cutoffResponse;
    }
  } catch (error) {
    data.hasError = true;
  }
  return NextResponse.json(data);
}
