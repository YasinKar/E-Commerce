import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: unknown;
}

const PROTECTED_PATHS = ['/dashboard', '/cart'];

const isProtected = (pathname: string) => {
  return PROTECTED_PATHS.some((path) => pathname.startsWith(path));
};

const isTokenValid = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authTokens = req.cookies.get('authTokens')?.value;

  if (!authTokens) {
    if (isProtected(pathname)) {
      return redirectToLogin(req);
    }
    return NextResponse.next();
  }

  let parsed;
  try {
    parsed = JSON.parse(authTokens);
  } catch {
    if (isProtected(pathname)) {
      return redirectToLogin(req);
    }
    return clearAuthCookies(req);
  }

  const access = parsed?.access;
  const refresh = parsed?.refresh;

  if (!access || !refresh) {
    if (isProtected(pathname)) {
      return redirectToLogin(req);
    }
    return clearAuthCookies(req);
  }

  if (!isTokenValid(access)) {
    try {
      const refreshRes = await fetch(`${process.env.API_URL}users/api/v1/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      });

      if (!refreshRes.ok) {
        if (isProtected(pathname)) {
          return redirectToLogin(req);
        }
        return clearAuthCookies(req);
      }

      const data = await refreshRes.json();
      const newAccess = data.access;

      const res = NextResponse.next();
      const newCookieValue = JSON.stringify({ access: newAccess, refresh });

      res.cookies.set('authTokens', newCookieValue, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return res;
    } catch {
      if (isProtected(pathname)) {
        return redirectToLogin(req);
      }
      return clearAuthCookies(req);
    }
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

function clearAuthCookies(req: NextRequest) {
  console.log(req);
  const res = NextResponse.next();
  res.cookies.delete('authTokens');
  return res;
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|images|fonts|api).*)'],
};