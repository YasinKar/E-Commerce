import axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from "jwt-decode";
// import { useRouter } from "next/navigation";

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

// http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
//   const authTokensString = window.localStorage.getItem("authTokens");

//   if (!authTokensString) return config;

//   const authTokens = JSON.parse(authTokensString);

//   if (!authTokens.access) return config;

//   // const router = useRouter();

//   if (!isTokenValid(authTokens.access)) {
//     try {
//       const response = await http.post("token/refresh/", {
//         refresh: authTokens.refresh,
//       });
//       localStorage.setItem("authTokens", JSON.stringify(response.data));
//       authTokens.access = response.data.access;
//     } catch (error) {
//       console.error("Failed to refresh token:", error);
//       // router.push("/login");
//       throw error;
//     }
//   }

//   if (config?.headers) {
//     config.headers.Authorization = `Bearer ${authTokens.access}`;
//   }

//   return config;
// });

export default http;