/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const selectedCollege = searchParams.get('selectedCollege');

    const response = await axios.get(`${API_BASE_URL}/${Api.collegeInfo}/${selectedCollege}`);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
