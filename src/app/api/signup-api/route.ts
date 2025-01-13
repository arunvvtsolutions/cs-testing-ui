/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function POST(req: Request) {
  try {
    const { userName, userEmail, userMobile, category } = await req.json();
    const response = await axios.post(`${API_BASE_URL}/${Api.userSignUp}`, {
      userName,
      userEmail,
      userMobile,
      category
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return new Response(null, {
      status: 500,
      statusText: error
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const mobileNo = searchParams.get('mobileNo');
    const response = await axios.get(`${API_BASE_URL}/${Api.userSignIn}/${mobileNo}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return new Response(null, {
      status: 500,
      statusText: error
    });
  }
}
