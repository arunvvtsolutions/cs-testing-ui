export const dynamic = 'force-dynamic';
export const dynamicParams = true;
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const response = await axios.get(`${API_BASE_URL}/${Api.studentGetBookmark}/${studentId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request) {
  try {
    const { studentId, collegeId, stream } = await request.json();
    const response = await axios.get(
      `${API_BASE_URL}/${Api.studentPostBookmark}/${studentId}/${collegeId}/${stream?.toLowerCase()}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(request: Request) {
  try {
    const { studentId, shortUrl, stream } = await request.json();
    const response = await axios.put(
      `${API_BASE_URL}/${Api.studentPutBookmark}/${studentId}/${shortUrl}/${stream?.toLowerCase()}`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
