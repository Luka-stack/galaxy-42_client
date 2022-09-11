import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('auth-cookie');

  const authRequire = [
    '/profile',
    '/profile/edit',
    '/profile/settings',
    '/planets/new',
  ];

  if (authRequire.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
