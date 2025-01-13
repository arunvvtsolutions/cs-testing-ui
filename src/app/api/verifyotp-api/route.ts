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
    const [mobileNo, otpNo] = [searchParams.get('mobileNo'), searchParams.get('otpNumber')];
    const response = await axios.get(`${API_BASE_URL}/${Api.verifyOtp}/${mobileNo}/${otpNo}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return new Response(null, {
      status: 500,
      statusText: error
    });
  }
}
