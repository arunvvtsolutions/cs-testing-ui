/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
// import { Api } from 'types/enums';

export async function GET(req: NextRequest, route: { params: { id: number } }) {
  try {
    const engResponse = await axios.get(
      `${API_BASE_URL}/engineering/${Api.compareBaseUrl}/${Api.compareHistoryList}/${route.params.id}`
    );
    const medResponse = await axios.get(
      `${API_BASE_URL}/medical/${Api.compareBaseUrl}/${Api.compareHistoryList}/${route.params.id}`
    );
    return NextResponse.json([...engResponse.data, ...medResponse.data]);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PATCH(req: Request, route: { params: { id: number } }) {
  try {
    const { stream } = await req.json();
    const response = await axios.patch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.removeCompareHistory}/${route.params.id}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
