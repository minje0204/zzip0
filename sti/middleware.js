import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('hh')
  const url = request.nextUrl.clone();
  if (url.pathname === '/oauth2/redirect') {
    console.log('middleware')
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}
