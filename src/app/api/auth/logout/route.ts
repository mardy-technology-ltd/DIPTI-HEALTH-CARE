import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'sb-access-token',
    value: '',
    path: '/',
    httpOnly: true,
    maxAge: 0,
  });

  cookieStore.set({
    name: 'sb-refresh-token',
    value: '',
    path: '/',
    httpOnly: true,
    maxAge: 0,
  });

  return NextResponse.json({ ok: true });
}