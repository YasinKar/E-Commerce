'use server'

import api from '@/utils/api/index'
import { revalidatePath } from 'next/cache';

export const getCart = async () => {
    const cart = await api.get('cart/v1/checkout/');
    return cart;
}

export const addOrder = async (id: number, count: number) => {
    const res = await api.post('cart/v1/add-order/', { product_id: id, count });
    revalidatePath('/cart');
    return res;
}

export const removeOrder = async (id: number) => {
    const res = await api.post('cart/v1/remove-order/', { order_id: id });
    revalidatePath('/cart');
    return res;
}

export const changeOrderCount = async (id: number, state: 'increase' | 'decrease') => {
    const res = await api.post('cart/v1/change-order-count/', { order_id: id, state });
    revalidatePath('/cart');
    return res;
}

export const selectAddress = async (id: number) => {
    const res = await api.post(`cart/v1/select-address/${id}/`, {});
    return res;
}