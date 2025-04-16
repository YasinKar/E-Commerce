'use server'

import api from '@/utils/api/index'
import { unstable_cache } from "next/cache";

export const getSettings = unstable_cache(
    async () => {
        const settings = await api.get('site/api/v1/settings/');
        return settings;
    },
    ['settings'],
    { revalidate: 3600, tags: ['settings'] }
)

export const getBanners = async () => {
    const banners = await api.get('site/api/v1/banners/')
    return banners
}

export const getFAQ = unstable_cache(
    async () => {
        const FAQ = await api.get('site/api/v1/FAQ/');
        return FAQ;
    },
    ['FAQ'],
    { revalidate: 3600, tags: ['FAQ'] }
)

export const getElectronicSymbols = unstable_cache(
    async () => {
        const ElectronicSymbols = await api.get('site/api/v1/electronic-symbols/');
        return ElectronicSymbols;
    },
    ['ElectronicSymbols'],
    { revalidate: 3600, tags: ['ElectronicSymbols'] }
)

export const ContactUs = async (fullName: string, email: string, title: string, message: string) => {
    const contact = await api.post('site/api/v1/contact-us/', { full_name: fullName, email, title, message })
    return contact
}