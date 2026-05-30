import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Wrap next/headers cookies() so we provide the functions createServerClient expects
    const cookieWrapper = {
      get(name: string) {
        const c = cookies().get(name);
        return c ? c.value : undefined;
      },
      set(name: string, value: string, options?: any) {
        // cookies().set accepts an object
        cookies().set({ name, value, ...options });
      },
      remove(name: string, options?: any) {
        // delete/remove cookie
        // next/headers provides delete(name) in some versions; use set with empty value for compatibility
        try {
          // @ts-ignore
          if (typeof cookies().delete === 'function') cookies().delete(name);
          else cookies().set({ name, value: '', maxAge: 0 });
        } catch (e) {
          cookies().set({ name, value: '', maxAge: 0 });
        }
      },
    };

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: cookieWrapper,
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user ?? null });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 });
  }
}
