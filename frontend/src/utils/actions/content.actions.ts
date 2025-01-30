'use server'

import api from '@/utils/api/index'

export const getSettings = async () => {
    const settings = await api.get('site/settings/');
    return settings;
}

export const getBanners = async () => {
    const banners = await api.get('site/banners/')
    return banners
}

export const getFAQ = async () => {
    const FAQ = await api.get('site/FAQ/');
    return FAQ;
}

export const getElectronicSymbols = async () => {
    const ElectronicSymbols = await api.get('site/electronic-symbols/');
    return ElectronicSymbols;
}

export const ContactUs = async (fullName: string, email: string, title: string, message: string) => {
    const contact = await api.post('site/contact-us/', { full_name: fullName, email, title, message })
    return contact
}