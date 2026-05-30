import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Use a simple server-side Supabase client to authenticate,
    // then set http-only cookies manually so middleware can read them.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // data.session should contain access_token and refresh_token
    const session = (data as any).session;
    if (session && session.access_token) {
      const cookieStore = cookies();
      const maxAge = session.expires_at ? Math.max(60, session.expires_at - Math.floor(Date.now() / 1000)) : 60 * 60 * 24 * 7;

      // Set access and refresh tokens as httpOnly cookies
      cookieStore.set({ name: 'sb-access-token', value: session.access_token, httpOnly: true, path: '/', maxAge });
      if (session.refresh_token) {
        cookieStore.set({ name: 'sb-refresh-token', value: session.refresh_token, httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 30 });
      }
    }

    return NextResponse.json({ user: data.user ?? null });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 });
  }
}
