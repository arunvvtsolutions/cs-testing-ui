import axios from 'axios';
import { NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function POST(request: Request) {
  const data = await request.formData();
  try {
    const result = await axios.post(`${API_BASE_URL}/${Api.dashboardMulterUpload}`, data);
    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
