/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function GET(request: NextRequest, router: { params: { collegeId: number } }) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${Api.medicalCollegeClosingRank}/${router.params.collegeId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
