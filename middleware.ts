import { auth } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/dashboard/:path*'],
};