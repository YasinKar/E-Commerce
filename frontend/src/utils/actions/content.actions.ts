'use server'

import api from '@/utils/api/index'
import { unstable_cache } from "next/cache";

export const getSettings = unstable_cache(
    async () => {
        const settings = await api.get('site/settings/');
        return settings;
    },
    ['settings'],
    { revalidate: 3600, tags: ['settings'] }
)

export const getBanners = async () => {
    const banners = await api.get('site/banners/')
    return banners
}

export const getFAQ = unstable_cache(
    async () => {
        const FAQ = await api.get('site/FAQ/');
        return FAQ;
    },
    ['FAQ'],
    { revalidate: 3600, tags: ['FAQ'] }
)

export const getElectronicSymbols = unstable_cache(
    async () => {
        const ElectronicSymbols = await api.get('site/electronic-symbols/');
        return ElectronicSymbols;
    },
    ['ElectronicSymbols'],
    { revalidate: 3600, tags: ['ElectronicSymbols'] }
)

export const ContactUs = async (fullName: string, email: string, title: string, message: string) => {
    const contact = await api.post('site/contact-us/', { full_name: fullName, email, title, message })
    return contact
}