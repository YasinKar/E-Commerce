import React from 'react'
import { Product } from '@/types/product.types'
import { getProduct } from '@/utils/actions/product.actions'
import ProductDetail from '@/components/ProductDetail'

const ProductDetailPage = async ({ params, }: { params: Promise<{ slug: string }> }) => {
    const product: Product = await getProduct((await params).slug)

    return <ProductDetail product={product}/>
}

export default ProductDetailPage