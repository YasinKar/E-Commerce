import axios, { InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const API_BASE_URL = process.env.API_URL;

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

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    return data.access;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
};

const getClientCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let authTokensString: string | null = null;

  if (typeof window === "undefined") {
    const cookieStore = await cookies();
    authTokensString = cookieStore.get("authTokens")?.value || null;
  } else {
    authTokensString = getClientCookie("authTokens");
  }

  if (!authTokensString) return config;

  let authTokens;
  try {
    authTokens = JSON.parse(authTokensString);
  } catch (error) {
    console.error("Invalid authTokens cookie:", error);
    return config;
  }

  if (!authTokens.access) return config;

  if (!isTokenValid(authTokens.access)) {
    try {
      const newAccessToken = await refreshAccessToken(authTokens.refresh);
      authTokens.access = newAccessToken;

      if (typeof window !== "undefined") {
        document.cookie = `authTokens=${encodeURIComponent(
          JSON.stringify(authTokens)
        )}; path=/; max-age=${30 * 24 * 60 * 60}`;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      if (typeof window !== "undefined") {
        document.cookie = "authTokens=; path=/; max-age=0";
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