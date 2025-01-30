'use server'

import api from '@/utils/api/index'

export const signIn = async (email: string, password: string) => {
    const res = await api.post('users/token/', { email, password });
    return res;
}

export const register = async (email: string, username: string, password: string, confirmPassword: string) => {
    const res = await api.post('users/register/', { email, username, password, confirm_password: confirmPassword });
    return res
}

export const getUser = async () => {
    const user = await api.get('dashboard/');
    return user
}