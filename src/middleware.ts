import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // If the user is not logged in and trying to access any admin route other than login, redirect to login
  if (!session && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const url = new URL(req.url);
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // If the user is logged in and tries to access the login page, redirect to the dashboard
  if (session && pathname === '/admin/login') {
    const url = new URL(req.url);
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
};
