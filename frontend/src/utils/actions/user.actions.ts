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
    return user.user
}

export const updateUser = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string
) => {
    const user = await api.put('dashboard/', {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
    });
    console.log(user);

    return user
}

export const getUserMessages = async () => {
    const messages = await api.get('dashboard/messages');
    return messages
}

export const getUserOrders = async (status: 'delivered' | 'processing' | 'out_for_delivery' | 'pending_payment' | null = null) => {
    const orders = await api.get(`dashboard/orders${status ? '?status=' + status : ''}`);
    return orders
}

export const getUserAddresses = async () => {
    const addresses = await api.get('dashboard/addresses');
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
    const address = await api.post('dashboard/add-address', {
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
    const address = await api.put(`dashboard/address/${id}`, {
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
    const address = await api.get(`dashboard/address/${id}`);
    return address
}

export const deleteAddress = async (id: number) => {
    const address = await api.delete(`dashboard/address/${id}`);
    return address
}

export const changeUserEmail = async (token: number) => {
    const res = await api.delete(`dashboard/change-email/${token}`);
    return res
}