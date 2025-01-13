import axios from 'axios';
import { NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function POST(req: Request) {
  try {
    const { stream, collegeName, ...reviewData } = await req.json();

    const response = await axios.post(`${API_BASE_URL}/${stream}/${Api.addReview}/${collegeName}`, reviewData);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
