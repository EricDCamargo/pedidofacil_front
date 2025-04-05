import { NextRequest, NextResponse } from 'next/server'
import { getCookieServer } from '@/lib/cookieServer'
import { UserRole } from './types/user.type'
import { getUserServer } from './services/retriveSSRData/retriveUserData'
import { ErrorMessages } from './services/errors/AuthTokenErorr'

const protectedRoutesForUser = [
  '/dashboard/product',
  '/dashboard/category',
  '/dashboard/table',
  '/dashboard/users'
]
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/_next') || pathname === '/') {
    return NextResponse.next()
  }

  const token = await getCookieServer()

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/?error=${ErrorMessages.TOKEN_EXPIRED}`, req.url)
      )
    }

    const user = await getUserServer()

    if (!user || !user.id) {
      return NextResponse.redirect(
        new URL(`/?error=${ErrorMessages.SERVICE_UNAVAILABLE}`, req.url)
      )
    }
    if (
      user?.role === UserRole.USER &&
      protectedRoutesForUser.includes(pathname)
    ) {
      return NextResponse.redirect(
        new URL(`/dashboard?error=${ErrorMessages.UNAUTHORIZED}`, req.url)
      )
    }
  }

  return NextResponse.next()
}
