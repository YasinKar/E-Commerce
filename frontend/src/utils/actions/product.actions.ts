'use server'

import api from '@/utils/api/index'

export const getProducts = async (query: string = '', page: number = 1) => {
    const products = await api.get(`api/v1/products?page=${page}${query}`);
    return products;
}

export const getCategories = async () => {
    const categories = await api.get('api/v1/categories')
    return categories
}

export const getBrands = async () => {
    const brands = await api.get('api/v1/brands')
    return brands
}

export const getColors = async () => {
    const colors = await api.get('api/v1/colors')
    return colors
}

export const getSizes = async () => {
    const sizes = await api.get('api/v1/sizes')
    return sizes
}

export const getProduct = async (slug: string) => {
    const product = await api.get(`api/v1/product/${slug}`)
    return product
}

export const Search = async (value: string, page: number = 1) => {
    const results = await api.get(`api/v1/search/?page=${page}&value=${value}`)
    return results
}