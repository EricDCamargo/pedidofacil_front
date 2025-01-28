import { NextRequest, NextResponse } from 'next/server'
import { getCookieServer } from '@/lib/cookieServer'
import { ErrorMessages, UserRole } from './types/user'
import { getUserServer } from './services/retriveSSRData/retriveUserData'

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
    console.log(user)

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
