import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
export async function POST(req: Request) {
  try {
    const { stream, ...data } = await req.json();
    const response = await axios.post(`${API_BASE_URL}/${stream}/${Api.collegeInnerQuestionreply}`, data);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const stream = searchParams.get('stream');
    const questionId = searchParams.get('questionId');

    const response = await axios.get(`${API_BASE_URL}/${stream}/${Api.collegeInnerQuestionsandAnswers}/${questionId}`);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
