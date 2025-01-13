import axios from 'axios';
import { NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
export async function GET(req: Request, route: { params: { studentId: number } }) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${Api.dashboardQuestions}/${route.params.studentId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
