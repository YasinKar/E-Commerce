'use server'

import React from 'react'
import ProductsFilter from './ProductsFilter'
import ProductCard from './ProductCard'
import Image from 'next/image'
import { Product } from '@/types/product.types'
import Pagination from './Pagination'
import { getBrands, getCategories, getColors, getProducts, getSizes } from '@/utils/actions/product.actions'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { getSettings } from '@/utils/actions/content.actions'

type ProductsListProps = {
    params: ReadonlyURLSearchParams
}

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: `${settings.site_name} | Products`,
  }
}

const ProductsList: React.FC<ProductsListProps> = async ({ params }) => {
    const query = `${params.get('category') ? `&category=${params.get('category')}` : ''}${params.get('brand') ? `&brand=${params.get('brand')}` : ''}${params.get('color') ? `&color=${params.get('color')}` : ''}${params.get('size') ? `&size=${params.get('size')}` : ''}${params.get('on_sale') ? `&on_sale=${params.get('on_sale')}` : ''}${params.get('gender') ? `&gender=${params.get('gender')}` : ''}${params.get('min_price') ? `&min_price=${params.get('min_price')}` : ''}${params.get('max_price') ? `&max_price=${params.get('max_price')}` : ''}`

    const currentPage = parseInt(params.get('page') ?? '1')

    const products = await getProducts(query, currentPage)
    const categories = await getCategories()
    const brands = await getBrands()
    const colors = await getColors()
    const sizes = await getSizes()

    return (
        <div className='flex'>
            <ProductsFilter brands={brands} categories={categories} colors={colors} sizes={sizes} />
            <section className='p-2 sm:p-5 flex flex-col items-center space-y-10 w-full'>
                {
                    products.results.length > 0 ?
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5'>
                            {
                                products.results.map((product: Product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            }
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center h-screen">
                            <Image className="object-cover" width={300} height={300} src={'/assets/images/Product-Not-Found.webp'} alt='Empty Cart' />
                            <p className="text">No product found</p>
                        </div>
                }
                <Pagination next={products.next} previous={products.previous} currentPage={currentPage} count={products.count} />
            </section>
        </div>
    )
}

export default ProductsList