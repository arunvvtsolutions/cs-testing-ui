import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { getCollegeInfoData } from 'utils/api/compare-college';
import { Api } from 'types/enums';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const selectedCollege = searchParams.get('selectedCollege');
  const stream = searchParams.get('stream');
  try {
    if (selectedCollege && stream) {
      const result = await getCollegeInfoData(selectedCollege, stream);
      return NextResponse.json(result.data);
    } else return NextResponse.json({ error: 'error' });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  const { stream, collegeIds, userId } = await request.json();
  try {
    if (userId) {
      const result = await axios.post(`${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/add-compare-history`, {
        collegeIds,
        userId
      });
      return NextResponse.json(result.data);
    } else return NextResponse.json({ error: 'error' });
  } catch (error) {
    return NextResponse.json(error);
  }
}
