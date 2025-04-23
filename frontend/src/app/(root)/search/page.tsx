'use client'

import { notFound, useSearchParams } from 'next/navigation'
import SearchComp from '@/components/Search'

const Search = () => {
  const searchParams = useSearchParams()
  const value = searchParams.get('value')

  if (!value) {
    notFound()
  }

  return <SearchComp params={searchParams} />
}

export default Search