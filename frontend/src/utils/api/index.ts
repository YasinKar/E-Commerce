import { isAxiosError } from 'axios';
import http from './http';
import { error } from 'console';

interface ErrorResponse {
    [key: string]: string[];
  }

function handleError(err: any) {
    console.log(err);
    
    // if (isAxiosError(err)) {
    //     console.error(err.response?.data);
    //     throw new Error(Object.values(err.response?.data as ErrorResponse)[0]?.[0] || 'An unexpected error occurred');
    // } else {
    //     console.error('An unexpected error occurred')
    //     throw new Error('An unexpected error occurred');
    // }
}

export default {
    async get(url: string) {
        try {
            const response = await http.get(url);            
            return response.data;
        } catch (err: any) {
            return handleError(err)
        }
    },
    async post(url: string, send: object) {
        try {
            const response = await http.post(url, send);
            return response.data;
        } catch (err: any) {
            return handleError(err)
        }
    },
    async put(url: string, send: object) {
        try {
            const response = await http.put(url, send);
            return response.data;
        } catch (err: any) {
            return handleError(err)
        }
    },
    async delete(url: string) {
        try {
            await http.delete(url);
            return true;
        } catch (err: any) {
            return handleError(err)
        }
    },
};