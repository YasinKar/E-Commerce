'use server'

import api from '@/utils/api/index'
import { unstable_cache } from "next/cache";
import { API_BASE_URL } from '../api/http';

export const getSettings = unstable_cache(
    async () => {
        const settings = await fetch(`${API_BASE_URL}site/v1/settings/`);
        return settings.json();
    },
    ['settings'],
    { revalidate: 3600, tags: ['settings'] }
)

export const getBanners = async () => {
    const banners = await api.get('site/v1/banners/')
    return banners
}

export const getFAQ = unstable_cache(
    async () => {
        const FAQ = await fetch(`${API_BASE_URL}site/v1/FAQ/`);
        return FAQ.json();
    },
    ['FAQ'],
    { revalidate: 3600, tags: ['FAQ'] }
)

export const getElectronicSymbols = unstable_cache(
    async () => {
        const ElectronicSymbols = await fetch(`${API_BASE_URL}site/v1/electronic-symbols/`);
        return ElectronicSymbols.json();
    },
    ['ElectronicSymbols'],
    { revalidate: 3600, tags: ['ElectronicSymbols'] }
)

export const ContactUs = async (fullName: string, email: string, title: string, message: string) => {
    const contact = await api.post('site/v1/contact-us/', { full_name: fullName, email, title, message })
    return contact
}