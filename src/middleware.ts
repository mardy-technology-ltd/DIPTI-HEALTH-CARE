import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const { pathname } = req.nextUrl;

  // Robust session detection: check for Supabase auth cookies directly.
  // This avoids relying on cookie adapters that can mismatch across runtimes.
  const hasSession = !!req.cookies.get('sb-access-token')?.value;

  // If the user is not logged in and trying to access any admin route other than login, redirect to login
  if (!hasSession && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const url = new URL(req.url);
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // If the user is logged in and tries to access the login page, redirect to the dashboard
  if (hasSession && pathname === '/admin/login') {
    const url = new URL(req.url);
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
