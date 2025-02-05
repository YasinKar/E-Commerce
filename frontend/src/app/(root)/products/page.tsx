import React from 'react'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import ProductsFilter from '@/components/ProductsFilter'
import { getBrands, getCategories, getColors, getProducts, getSizes } from "@/utils/actions/product.actions";
import { Product } from '@/types/product.types';
import { getSettings } from '@/utils/actions/content.actions';

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: `${settings.site_name} | Products`,
  }
}

type ProductsProps = {
  searchParams: Record<string, string | string[] | undefined>;
}

const Products = async ({ searchParams }: ProductsProps) => {
  searchParams = await searchParams
  const query = `${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.brand ? `&brand=${searchParams.brand}` : ''}${searchParams.color ? `&color=${searchParams.color}` : ''}${searchParams.size ? `&size=${searchParams.size}` : ''}${searchParams.on_sale ? `&on_sale=${searchParams.on_sale}` : ''}${searchParams.gender ? `&gender=${searchParams.gender}` : ''}${searchParams.min_price ? `&min_price=${searchParams.min_price}` : ''}${searchParams.max_price ? `&max_price=${searchParams.max_price}` : ''}`

  const currentPage = parseInt(searchParams.page && typeof searchParams.page === 'string' ? searchParams.page : '1')

  const products = await getProducts(query, currentPage)

  const categories = await getCategories()

  const brands = await getBrands()

  const colors = await getColors()

  const sizes = await getSizes()

  return (
    <div className='flex'>
      <ProductsFilter brands={brands} categories={categories} colors={colors} sizes={sizes} />
      <section className='p-2 sm:p-5 flex flex-col items-center space-y-10'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5'>
          {
            products.results.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
        <Pagination next={products.next} previous={products.previous} currentPage={currentPage} count={products.count} />
      </section>
    </div>
  )
}

export default Products