import { NextRequest, NextResponse } from 'next/server'

const roleMap: Record<string, string[]> = {
  '/admin': ['admin'],
  '/employer': ['employer'],
  '/seeker': ['job_seeker'],
}

function getAllowedRoles(pathname: string): string[] | null {
  for (const basePath in roleMap) {
    if (pathname.startsWith(basePath)) {
      return roleMap[basePath]
    }
  }
  return null
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const url = request.nextUrl.clone()

  if (!token) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const res = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
  })

  if (res.status !== 200) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const data = await res.json()
  const userRole = data.user.role
  const allowedRoles = getAllowedRoles(request.nextUrl.pathname)

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    url.pathname = '/unauthorized'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/employer/:path*', '/seeker/:path*'],
}
