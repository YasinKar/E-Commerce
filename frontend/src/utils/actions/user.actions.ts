'use server'

import api from '@/utils/api/index'
import { revalidatePath } from 'next/cache';

export const signIn = async (email: string, password: string) => {
    const res = await api.post('users/api/v1/token/', { email, password });
    return res;
}

export const register = async (email: string, username: string, password: string, confirmPassword: string) => {
    const res = await api.post('users/api/v1/register/', { email, username, password, confirm_password: confirmPassword });
    return res
}

export const requestOTP = async (email: string) => {
    const res = await api.post('users/api/v1/request-otp/', { email });
    return res
}

export const verifyEmail = async (email: string, code: string) => {
    const res = await api.post('users/api/v1/verify-otp/', { email, code });
    return res
}

export const getUser = async () => {
    const user = await api.get('dashboard/api/v1/');
    return user.user
}

export const updateUser = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string
) => {
    const user = await api.put('dashboard/api/v1/', {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
    });
    console.log(user);

    return user
}

export const getUserMessages = async () => {
    const messages = await api.get('dashboard/api/v1/messages');
    return messages
}

export const deleteUserMessages = async () => {
    const res = await api.delete('dashboard/api/v1/messages/delete/');
    revalidatePath('/dashboard/messages')
    return res
}

export const getUserOrders = async (status: 'delivered' | 'processing' | 'out_for_delivery' | 'pending_payment' | null = null) => {
    const orders = await api.get(`dashboard/api/v1/orders${status ? '?status=' + status : ''}`);
    return orders
}

export const getUserAddresses = async () => {
    const addresses = await api.get('dashboard/api/v1/addresses');
    return addresses
}

export const addAddress = async (
    receiverFirstName: string,
    receiverLastName: string,
    receiverPhone: string,
    receiverNationalCode: string,
    receiverPostCode: string,
    receiverAddress: string,
    latitude: string,
    longitude: string
) => {
    const address = await api.post('dashboard/api/v1/add-address', {
        receiver_first_name: receiverFirstName,
        receiver_last_name: receiverLastName,
        receiver_phone: receiverPhone,
        receiver_national_code: receiverNationalCode,
        receiver_post_code: receiverPostCode,
        receiver_address: receiverAddress,
        latitude,
        longitude
    });
    return address
}

export const updateAddress = async (
    id: string,
    receiverFirstName: string,
    receiverLastName: string,
    receiverPhone: string,
    receiverNationalCode: string,
    receiverPostCode: string,
    receiverAddress: string,
    latitude: string,
    longitude: string
) => {
    const address = await api.put(`dashboard/api/v1/address/${id}`, {
        receiver_first_name: receiverFirstName,
        receiver_last_name: receiverLastName,
        receiver_phone: receiverPhone,
        receiver_national_code: receiverNationalCode,
        receiver_post_code: receiverPostCode,
        receiver_address: receiverAddress,
        latitude,
        longitude
    });
    return address
}

export const getAddress = async (id: number) => {
    const address = await api.get(`dashboard/api/v1/address/${id}`);
    return address
}

export const deleteAddress = async (id: number) => {
    const address = await api.delete(`dashboard/api/v1/address/${id}`);
    return address
}

export const changeUserEmail = async (token: number) => {
    const res = await api.delete(`dashboard/api/v1/change-email/${token}`);
    return res
}