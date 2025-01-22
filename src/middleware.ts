import { NextRequest, NextResponse } from 'next/server'
import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from './services/service.consumer'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/_next') || pathname === '/') {
    return NextResponse.next()
  }

  const token = await getCookieServer()

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    const isValid = await validateToken(token)
    console.log(isValid)

    if (!isValid) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

async function validateToken(token: string) {
  if (!token) return false

  try {
    serviceConsumer('').executeGet('/me')
    return true
  } catch (err) {
    return false
  }
}
