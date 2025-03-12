import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

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

export async function middleware(req: NextRequest) {
    const authTokensString = await getCookie("authTokens", { req });

    if (!authTokensString) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    let authTokens;
    try {
        authTokens = JSON.parse(authTokensString as string);
    } catch (error) {
        console.error("Invalid authTokens:", error);
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("authTokens");
        return response;
    }

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