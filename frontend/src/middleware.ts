import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
    const authTokensString = cookieStore.get("authTokens")?.value;

    if (!authTokensString) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    let authTokens;
    try {
        authTokens = JSON.parse(authTokensString);
    } catch (error) {
        console.error("Invalid authTokens:", error);
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("authTokens");
        return response;
    }

    interface JwtPayload {
        exp: number;
        [key: string]: any;
    }

    const isTokenValid = (token: string) => {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        } catch {
            return false;
        }
    };

    if (!isTokenValid(authTokens.access)) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("authTokens");
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/cart/:path*"],
};