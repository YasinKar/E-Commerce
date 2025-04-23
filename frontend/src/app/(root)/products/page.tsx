'use client'

import React from 'react'
import ProductsList from '@/components/ProductsList';
import { useSearchParams } from 'next/navigation'

const Products = () => {
  const searchParams = useSearchParams()

  return <ProductsList params={searchParams}/>
}

export default Products