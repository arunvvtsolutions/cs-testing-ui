import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const [place, substream, stream, category] = [
    searchParams.get('place'),
    searchParams.get('substream'),
    searchParams.get('stream'),
    searchParams.get('category')
  ];
  try {
    const result = await axios.get(
      `${API_BASE_URL}/${stream}/${Api.categoryWisePagedata}/${category}/${substream}/${place}`
    );
    const data = await result.data;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
