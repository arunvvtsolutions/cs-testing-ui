/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/${Api.searchColleges}`);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
