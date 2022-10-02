import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;
  // const token = req.cookies.get('auth-cookie');

  // const authRequire = [
  //   '/profile',
  //   '/profile/edit',
  //   '/profile/settings',
  //   '/profile/notifications',
  //   '/planets/new',
  // ];

  // const authPath = ['/login', '/register'];

  // if (authRequire.includes(pathname) && !token) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // if (authPath.includes(pathname) && token) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  return NextResponse.next();
}
