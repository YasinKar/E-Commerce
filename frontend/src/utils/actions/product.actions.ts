'use server'

import api from '@/utils/api/index'

export const getProducts = async (query: string = '', page: number = 1) => {
    const products = await api.get(`/products/?page=${page}${query}`);
    return products;
}

export const getCategories = async () => {
    const categories = await api.get('categories')
    return categories
}

export const getBrands = async () => {
    const brands = await api.get('brands')
    return brands
}

export const getColors = async () => {
    const colors = await api.get('colors')
    return colors
}

export const getSizes = async () => {
    const sizes = await api.get('sizes')
    return sizes
}

export const getProduct = async (slug: string) => {
    const product = await api.get(`product/${slug}`)
    return product
}