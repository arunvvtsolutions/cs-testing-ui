/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { StreamCode } from 'types';
import { Api } from 'types/enums';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const [categoty, substream, stream] = [
      searchParams.get('categoty'),
      searchParams.get('substream'),
      searchParams.get('stream')
    ];

    if (substream) {
      const response = await axios.get(
        `${API_BASE_URL}/${stream}/${Api.topColleges}/10/${categoty}/${StreamCode[substream]}`
      );

      return NextResponse.json(response.data);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
