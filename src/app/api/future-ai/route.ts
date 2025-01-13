import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const [collegeId, courseId, seat] = [
    searchParams.get('collegeId'),
    searchParams.get('courseId'),
    searchParams.get('seat')
  ];
  try {
    const result = await fetch(`${API_BASE_URL}/${Api.futureAitoolPost}/${collegeId}/${courseId}/${seat}`);

    const data = await result.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
