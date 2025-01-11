import { AxiosError } from "axios";
import api from "./api";
import { APIResponse } from '@/types/response.types'

export default {
    async get<T>(url: string): Promise<APIResponse<T>> {
        try {
            const request = await api.get<T>(url);
            return {
                status: "Success",
                message: request.statusText,
                statusCode: request.status,
                response: request.data,
            };
        } catch (error: any) {
            if (error.isAxiosError) {
                const axiosError = error as AxiosError;
                return {
                    status: "Error",
                    statusCode: axiosError.response?.status || 500,
                    message: axiosError.response?.statusText as string,
                };
            } else {
                return {
                    status: "Error",
                    statusCode: 500,
                    message: "Unknown error occurred",
                };
            }
        }
    },
    async post<T>(url: string, send: object): Promise<APIResponse<T>> {
        try {
            const request = await api.post<T>(url, send);
            return {
                response: request.data,
                message: request.statusText,
                statusCode: request.status,
                status: 'Success'
            }
        } catch (error: any) {
            if (error.isAxiosError) {
                const axiosError = error as AxiosError;
                return {
                    status: "Error",
                    statusCode: axiosError.response?.status || 500,
                    message: axiosError.response?.statusText as string,
                };
            } else {
                return {
                    status: "Error",
                    statusCode: 500,
                    message: "Unknown error occurred",
                };
            }
        }
    },
    async put<T>(url: string, send: object): Promise<APIResponse<T>> {
        try {
            const request = await api.put<T>(url, send);
            return {
                response: request.data,
                message: request.statusText,
                statusCode: request.status,
                status: 'Success'
            };
        } catch (error: any) {
            if (error.isAxiosError) {
                const axiosError = error as AxiosError;
                return {
                    status: "Error",
                    statusCode: axiosError.response?.status || 500,
                    message: axiosError.response?.statusText as string,
                };
            } else {
                return {
                    status: "Error",
                    statusCode: 500,
                    message: "Unknown error occurred",
                };
            }
        }
    },
    async delete<T>(url: string): Promise<APIResponse<T>> {
        try {
            const request = await api.delete<T>(url);
            return {
                response: request.data,
                message: request.statusText,
                statusCode: request.status,
                status: 'Success'
            };
        } catch (error: any) {
            if (error.isAxiosError) {
                const axiosError = error as AxiosError;
                return {
                    status: "Error",
                    statusCode: axiosError.response?.status || 500,
                    message: axiosError.response?.statusText as string,
                };
            } else {
                return {
                    status: "Error",
                    statusCode: 500,
                    message: "Unknown error occurred",
                };
            }
        }
    },
};