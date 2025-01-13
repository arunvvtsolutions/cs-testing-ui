import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';

export async function POST(request: Request) {
  const { studentId, fullName, lastName, emailId, mobile, gender, dob, postCode, city, area, stream } =
    await request.json();
  try {
    const result = await axios.post(`${API_BASE_URL}/${Api.dashboardPostProfile}`, {
      studentId,
      fullName,
      lastName,
      emailId,
      mobile,
      gender,
      dob,
      postCode,
      city,
      area,
      stream
    });
    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function GET(request: NextRequest, route: { params: { studentId: number } }) {
  const studentId = route.params.studentId;
  try {
    const result = await fetch(`${API_BASE_URL}/${Api.dashboardGetProfile}/${studentId}`);
    const data = await result.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
