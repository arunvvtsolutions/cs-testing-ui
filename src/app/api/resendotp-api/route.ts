/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const mobileNo = searchParams.get('mobileNo');
    const response = await axios.get(`${API_BASE_URL}/${Api.resendOtp}/${mobileNo}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
