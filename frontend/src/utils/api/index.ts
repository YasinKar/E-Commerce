import http from './http';

export default {
    async get(url: string) {
        try {
            const response = await http.get(url);
            return response.data;
        } catch (err: any) {
            console.error(err);
            return false
        }
    },
    async post(url: string, send: object) {
        try {
            const response = await http.post(url, send);
            return response.data;
        } catch (err: any) {
            console.error(err);
            return false
        }
    },
    async put(url: string, send: object) {
        try {
            const response = await http.put(url, send);
            return response.data;
        } catch (err: any) {
            console.error(err);
            return false
        }
    },
    async delete(url: string) {
        try {
            await http.delete(url);
            return true;
        } catch (err: any) {
            console.error(err);
            return false
        }
    },
};