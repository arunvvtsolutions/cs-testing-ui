/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

import { API_BASE_URL } from 'config';

export async function GET(request: NextRequest, route: { params: { studentId: string } }) {
  const studentId = route.params.studentId;
  try {
    const result = await fetch(`${API_BASE_URL}/user/college/bookmark/${studentId}`);
    const data = await result.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function PUT(request: Request) {
  const { studentId, shortUrl, stream } = await request.json();
  try {
    const result = await axios.put(`${API_BASE_URL}/user/college/remove-bookmark/${studentId}/${shortUrl}/${stream}`);
    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
