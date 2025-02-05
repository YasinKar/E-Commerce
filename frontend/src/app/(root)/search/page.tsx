import React from 'react'
import { Search as SearchAction } from '@/utils/actions/product.actions'
import { notFound } from 'next/navigation'
import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product.types';
import { getSettings } from '@/utils/actions/content.actions';

type SearchProps = {
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ searchParams }: SearchProps) {
  searchParams = await searchParams
  const settings = await getSettings();

  return {
    title: `${settings.site_name} | search results for ${searchParams.value}`,
  }
}

const Search = async ({ searchParams }: SearchProps) => {
  searchParams = await searchParams

  if (!searchParams.value) {
    notFound()
  }

  const currentPage = parseInt(searchParams.page && typeof searchParams.page === 'string' ? searchParams.page : '1')

  const products = await SearchAction(searchParams.value.toString(), currentPage)

  return (
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
  )
}

export default Search