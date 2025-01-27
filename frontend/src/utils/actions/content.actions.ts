'use server'

import api from '@/utils/api/index'

export const getContents = async () => {
    const products = await api.get('site/contents/');
    return products;
}

export const getBanners = async () => {
    const banners = await api.get('site/banners/')
    return banners
}

export const ContactUs = async (data: object) => {
    const contact = await api.post('site/contact-us/', data)
    return contact
}