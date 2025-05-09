import { isAxiosError } from 'axios';
import http from './http';

interface ErrorResponse {
    [key: string]: string[] | string;
}

function handleError(err: unknown): never {
    if (isAxiosError(err)) {
        console.error(err.response?.data);
        const errorData = Object.values(err.response?.data as ErrorResponse)[0];
        const errorMessage = Array.isArray(errorData) ? errorData[0] : errorData;
        throw new Error(errorMessage || 'An unexpected error occurred');
    } else {
        console.error('An unexpected error occurred');
        throw new Error('An unexpected error occurred');
    }
}

const api = {
    async get(url: string) {
        try {
            const response = await http.get(url);
            return response.data;
        } catch (err: unknown) {
            return handleError(err)
        }
    },
    async post(url: string, send: object) {
        try {
            const response = await http.post(url, send);
            return response.data;
        } catch (err: unknown) {
            return handleError(err)
        }
    },
    async put(url: string, send: object) {
        try {
            const response = await http.put(url, send);
            return response.data;
        } catch (err: unknown) {
            return handleError(err)
        }
    },
    async delete(url: string) {
        try {
            await http.delete(url);
            return true;
        } catch (err: unknown) {
            return handleError(err)
        }
    },
};

export default api