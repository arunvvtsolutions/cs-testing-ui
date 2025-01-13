/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const selectedCollege = searchParams.get('selectedCollege');
    const selectedCourse = searchParams.get('selectedCourse');

    const response = await axios.get(
      `${API_BASE_URL}/engineering/free-tool/collegeIq/cutoff/${selectedCollege}/${selectedCourse}/`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
