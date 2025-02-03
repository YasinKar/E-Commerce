import axios, { InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, setCookie } from 'cookies-next';
import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers';

export const API_BASE_URL = process.env.API_URL

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

const http = axios.create({
  baseURL: API_BASE_URL,
});

http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const cookieStore = await cookies()

  const authTokensString = cookieStore.get('authTokens')?.value

  if (!authTokensString) return config;

  let authTokens;
  try {
    authTokens = JSON.parse(authTokensString as string);
  } catch (error) {
    console.error("Invalid authTokens cookie:", error);
    await deleteCookie("authTokens");
    return config;
  }

  if (!authTokens.access) return config;

  if (!isTokenValid(authTokens.access)) {
    try {
      const response = await http.post("token/refresh/", {
        refresh: authTokens.refresh,
      });

      authTokens.access = response.data.access;
      await setCookie("authTokens", JSON.stringify(authTokens), {
        maxAge: 30 * 24 * 60 * 60,
      });
    } catch (error) {
      console.error("Failed to refresh token:", error);
      await deleteCookie("authTokens");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw error;
    }
  }

  if (config?.headers) {
    config.headers.Authorization = `Bearer ${authTokens.access}`;
  }

  return config;
});

export default http;