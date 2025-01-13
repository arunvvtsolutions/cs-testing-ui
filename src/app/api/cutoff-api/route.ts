import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { Stream } from 'types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const [collegeUrl, courseId, casteId, genderId, quotaId] = [
    searchParams.get('collegeUrl'),
    searchParams.get('courseId'),
    searchParams.get('casteId'),
    searchParams.get('genderId'),
    searchParams.get('quotaId')
  ];
  try {
    const result = await fetch(
      `${API_BASE_URL}/${Stream.ENGINEERING}/${Api.collegeCutofResult}/${collegeUrl}/${courseId}/${casteId}/${genderId}/${quotaId}`
    );

    const data = await result.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
