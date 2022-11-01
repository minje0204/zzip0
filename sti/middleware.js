import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/oauth2/redirect') {
    url.pathname = '/roomlist';
    return NextResponse.redirect(url);
  }

}
