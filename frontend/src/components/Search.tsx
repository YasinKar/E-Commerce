'use server'

import Image from 'next/image'
import React from 'react'
import Pagination from './Pagination'
import ProductCard from './ProductCard'
import { Product } from '@/types/product.types'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { Search as SearchAction } from '@/utils/actions/product.actions'
import { getSettings } from '@/utils/actions/content.actions'

type SearchProps = {
  params: ReadonlyURLSearchParams
}

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: `${settings.site_name} | search results `,
  }
}

const Search: React.FC<SearchProps> = async ({ params }) => {

  const currentPage = parseInt(params.get('page')! ? params.get('page')! : '1')

  const products = await SearchAction(params.get('value')!, currentPage)

  return (
    <section className='p-2 sm:p-5 flex flex-col items-center space-y-10'>
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
          <div className="flex flex-col justify-center items-center">
            <Image className="object-cover" width={300} height={300} src={'/assets/images/Product-Not-Found.webp'} alt='Empty Cart' />
            <p className="text">No product found</p>
          </div>
      }
      <Pagination next={products.next} previous={products.previous} currentPage={currentPage} count={products.count} />
    </section>
  )
}

export default Search