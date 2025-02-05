import React from 'react'
import { Product } from '@/types/product.types'
import { getProduct } from '@/utils/actions/product.actions'
import ProductDetail from '@/components/ProductDetail'
import { getSettings } from '@/utils/actions/content.actions';

export async function generateMetadata({ params, }: { params: Promise<{ slug: string }> }) {
    const settings = await getSettings();
    const product: Product = await getProduct((await params).slug)

    return {
        title: `${settings.site_name} | ${product.name}`,
    }
}

const ProductDetailPage = async ({ params, }: { params: Promise<{ slug: string }> }) => {
    const product: Product = await getProduct((await params).slug)

    return <ProductDetail product={product} />
}

export default ProductDetailPage