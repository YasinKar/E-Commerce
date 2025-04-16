import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export const API_BASE_URL = process.env.API_URL;

const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let authTokensString: string | null = null;

  const cookieStore = await cookies();
  authTokensString = cookieStore.get("authTokens")?.value || null;

  if (!authTokensString) return config;

  let authTokens;
  try {
    authTokens = JSON.parse(authTokensString);
  } catch (error) {
    console.error("Invalid authTokens cookie:", error);
    return config;
  }

  if (!authTokens.access) return config;

  if (config?.headers) {
    config.headers.Authorization = `Bearer ${authTokens.access}`;
  }

  return config;
});

export default http;