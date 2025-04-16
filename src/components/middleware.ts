// middleware.ts (or middleware.js if not using TS)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip static files and API routes
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/api') ||
    pathname.includes('_next')
  ) {
    return
  }

  const locale = req.headers.get('accept-language')?.split(',')[0].split('-')[0] || 'en'
  const supportedLocales = ['en', 'fr', 'de']

  const matchedLocale = supportedLocales.includes(locale) ? locale : 'en'

  if (!pathname.startsWith(`/${matchedLocale}`)) {
    return NextResponse.redirect(new URL(`/${matchedLocale}${pathname}`, req.url))
  }
}
