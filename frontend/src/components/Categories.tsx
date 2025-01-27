import React from 'react'
import { Category } from '@/types/category.types'
import Link from 'next/link'
import Image from 'next/image'

type CategoriesProps = {
  categories: Category[]
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <section className='section'>
      <h2 className='title'>Categories</h2>
      <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-10">
        {
          categories.map(category => (
            <Link href={`products/?category=${category.slug}`} key={category.id}>
              <div className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] border-2 border-sky-500 p-1 rounded-full " >
                <Image src={category.image} alt={category.name} width={1000} height={1000} className="rounded-full w-full h-full object-cover hover:rotate-[10deg] transition duration-500" />
              </div>
              <h3 className="text">{category.name}</h3>
            </Link>
          ))
        }
      </div>
    </section>
  )
}

export default Categories