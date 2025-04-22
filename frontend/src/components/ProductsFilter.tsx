'use client'

import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { Category } from '@/types/category.types';
import { Brand } from '@/types/brand.types';
import { Color } from '@/types/product.types';
import { Size } from '@/types/product.types';

type ProductsFilterProps = {
  categories: Category[]
  brands: Brand[]
  colors: Color[]
  sizes: Size[]
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({ brands, categories, colors, sizes }) => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    min_price: 0,
    max_price: 10000000,
    on_sale: false,
    gender: '',
    category: '',
    brand: '',
    color: '',
    size: '',
  });

  const query = `?page=1${filters.category ? `&category=${filters.category}` : ''}${filters.brand ? `&brand=${filters.brand}` : ''}${filters.color ? `&color=${filters.color}` : ''}${filters.size ? `&size=${filters.size}` : ''}${filters.on_sale ? `&on_sale=${filters.on_sale}` : ''}${filters.gender ? `&gender=${filters.gender}` : ''}${filters.min_price ? `&min_price=${filters.min_price}` : ''}${filters.max_price ? `&max_price=${filters.max_price}` : ''}`

  // const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = Math.min(Number(e.target.value), filters.max_price - 1);
  //   setFilters(prev => ({ ...prev, min_price: value }));
  // };

  // const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = Math.max(Number(e.target.value), filters.min_price + 1);
  //   setFilters(prev => ({ ...prev, max_price: value }));
  // };

  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const [brandsSearchQuery, setBrandsSearchQuery] = useState('');
  const [categoriesSearchQuery, setCategoriesSearchQuery] = useState('');


  const toggleAccordion = (index: string) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(brandsSearchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(categoriesSearchQuery.toLowerCase())
  );

  return (
    <>
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
      `}</style>
      <div className='col-span-4 row-span-2 hidden lg:block xl:col-span-3'>
        <div className="w-[300px] sticky top-32 mb-4 border-r border-b border-gray-300">
          <div className="flex max-h-full flex-col">
            <div className="flex h-full flex-col gap-4 p-4">
              <div className="flex items-center justify-between pb-0">
                <div className="title">Filters</div>
                <button onClick={() => router.push('/products')} className="text-base font-medium text-sky-500">
                  Reset filters
                </button>
              </div>
              <div className="grow">
                <ul className="divide-y">
                  <li className='py-3'>
                    <label className="flex justify-between items-center cursor-pointer text">
                      <span >Special Sale Products</span>
                      <input type="checkbox" name='on_sale' className="sr-only peer" onChange={() => setFilters(prev => ({ ...prev, on_sale: true }))} />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"></div>
                    </label>
                  </li>
                  {/* <li className="py-3">
                    <label className="flex justify-between items-center cursor-pointer text" onClick={() => toggleAccordion('priceRange')}>
                      <span>Price Range</span>
                      <ChevronRight className={`${activeIndex === 'priceRange' ? 'rotate-90' : ''} transition-all`} />
                    </label>
                    <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeIndex === 'priceRange' ? "max-h-[500px]" : "max-h-0"}`}>
                      <div className="w-full max-w-md mx-auto p-4">
                        <div className="relative w-full">
                          <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded transform -translate-y-1/2"></div>

                          <div
                            className="absolute top-1/2 h-1 bg-blue-500 rounded transform -translate-y-1/2"
                            style={{
                              left: `${(filters.min_price / 100) * 100}%`,
                              right: `${100 - (filters.max_price / 100) * 100}%`,
                            }}
                          ></div>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={filters.min_price}
                            onChange={handleMinChange}
                            className="absolute w-full -top-2 appearance-none pointer-events-auto h-4 bg-transparent focus:outline-none slider-thumb"
                            style={{
                              zIndex: filters.min_price === filters.max_price ? 1 : 0,
                            }}
                          />

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={filters.max_price}
                            onChange={handleMaxChange}
                            className="absolute w-full -top-2 appearance-none pointer-events-auto h-4 bg-transparent focus:outline-none slider-thumb"
                          />
                        </div>
                      </div>
                      <p className='text-black text-center text-sm'>
                        Min Price : {filters.min_price} - Max Price : {filters.max_price}
                      </p>
                    </div>
                  </li> */}
                  <li className="py-3">
                    <label className="flex justify-between items-center cursor-pointer text" onClick={() => toggleAccordion('categories')}>
                      <span>Categories</span>
                      <ChevronRight className={`${activeIndex === 'categories' ? 'rotate-90' : ''} transition-all`} />
                    </label>
                    <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeIndex === 'categories' ? "max-h-[500px]" : "max-h-0"}`}>
                      <div className="w-full max-w-md p-2">
                        <input
                          type="search"
                          placeholder="Search categories..."
                          onChange={(e) => setCategoriesSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />

                        <ul className="space-y-2">
                          {filteredCategories.map(category => (
                            <li key={category.id}>
                              <label className="flex justify-between items-center py-2 font-medium text-black cursor-pointer">
                                {category.name}
                                <input
                                  checked={filters.category === category.slug}
                                  type="checkbox"
                                  value={category.id}
                                  className="w-4 h-4 text-sky-500 bg-gray-100 border-gray-300 rounded"
                                  onChange={() => setFilters(prev => (prev.category === category.slug ? { ...prev, category: '' } : { ...prev, category: category.slug }))} />
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <label className="flex justify-between items-center cursor-pointer text" onClick={() => toggleAccordion('brands')}>
                      <span>Brands</span>
                      <ChevronRight className={`${activeIndex === 'brands' ? 'rotate-90' : ''} transition-all`} />
                    </label>
                    <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeIndex === 'brands' ? "max-h-[500px]" : "max-h-0"}`}>
                      <div className="w-full max-w-md p-2">
                        <input
                          type="search"
                          placeholder="Search brands..."
                          onChange={(e) => setBrandsSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />

                        <ul className="divide-y">
                          {filteredBrands.map(brand => (
                            <li key={brand.id}>
                              <label className="flex justify-between items-center py-2 font-medium text-black cursor-pointer">
                                {brand.name}
                                <input
                                  type="checkbox"
                                  value={brand.id}
                                  className="w-4 h-4 text-sky-500 bg-gray-100 border-gray-300 rounded"
                                  checked={filters.brand === brand.slug}
                                  onChange={() => setFilters(prev => (prev.brand === brand.slug ? { ...prev, brand: '' } : { ...prev, brand: brand.slug }))}
                                />
                              </label>
                            </li>
                          ))}

                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <label className="flex justify-between items-center cursor-pointer text" onClick={() => toggleAccordion('gender')}>
                      <span>Gender</span>
                      <ChevronRight className={`${activeIndex === 'gender' ? 'rotate-90' : ''} transition-all`} />
                    </label>
                    <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeIndex === 'gender' ? "max-h-[500px]" : "max-h-0"}`}>
                      <div className="w-full max-w-md p-2">
                        <ul className="divide-y">
                          <li>
                            <label className="flex justify-between items-center py-2 font-medium text-black cursor-pointer">
                              Female
                              <input
                                type="checkbox"
                                value='female'
                                className="w-4 h-4 text-sky-500 bg-gray-100 border-gray-300 rounded"
                                checked={filters.gender === 'Female'}
                                onChange={() => setFilters(prev => (prev.gender === 'Female' ? { ...prev, gender: '' } : { ...prev, gender: 'Female' }))}
                              />
                            </label>
                          </li>
                          <li>
                            <label className="flex justify-between items-center py-2 font-medium text-black cursor-pointer">
                              Male
                              <input
                                type="checkbox"
                                value='male'
                                className="w-4 h-4 text-sky-500 bg-gray-100 border-gray-300 rounded"
                                checked={filters.gender === 'Male'}
                                onChange={() => setFilters(prev => (prev.gender === 'Male' ? { ...prev, gender: '' } : { ...prev, gender: 'Male' }))}
                              />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <label className="flex justify-between items-center cursor-pointer text" onClick={() => toggleAccordion('colors')}>
                      <span>Colors</span>
                      <ChevronRight className={`${activeIndex === 'colors' ? 'rotate-90' : ''} transition-all`} />
                    </label>
                    <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeIndex === 'colors' ? "max-h-[500px]" : "max-h-0"}`}>
                      <div className="w-full max-w-md p-2">
                        <ul className="divide-y">
                          {colors.map(color => (
                            <li key={color.id}>
                              <label className="flex justify-between items-center py-2 font-medium text-black cursor-pointer">
                                <span className='flex justify-center items-center gap-2'>
                                  {color.color_name}
                                  <span className='w-5 h-5 border border-black rounded-md' style={{ backgroundColor: color.color_code }}></span>
                                </span>
                                <input
                                  type="checkbox"
                                  value={color.color_name}
                                  className="w-4 h-4 text-sky-500 bg-gray-100 border-gray-300 rounded"
                                  checked={filters.color === color.color_name}
                                  onChange={() => setFilters(prev => (prev.color === color.color_name ? { ...prev, color: '' } : { ...prev, color: color.color_name }))}
                                />
                              </label>
                            </li>
                          ))}

                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <label className="flex justify-between items-center cursor-pointer text" onClick={() => toggleAccordion('sizes')}>
                      <span>Sizes</span>
                      <ChevronRight className={`${activeIndex === 'sizes' ? 'rotate-90' : ''} transition-all`} />
                    </label>
                    <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeIndex === 'sizes' ? "max-h-[500px]" : "max-h-0"}`}>
                      <div className="w-full max-w-md p-2">
                        <ul className="divide-y">
                          {sizes.map(size => (
                            <li key={size.id}>
                              <label className="flex justify-between items-center py-2 font-medium text-black cursor-pointer">
                                {size.size}
                                <input
                                  type="checkbox"
                                  value={size.size}
                                  className="w-4 h-4 text-sky-500 bg-gray-100 border-gray-300 rounded"
                                  checked={filters.size === size.size}
                                  onChange={() => setFilters(prev => (prev.size === size.size ? { ...prev, size: '' } : { ...prev, size: size.size }))}
                                />
                              </label>
                            </li>
                          ))}

                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <button onClick={() => router.push(`/products/${query}`)} className='w-full bg-sky-500 p-2 rounded-lg text-white hover:bg-sky-600 transition-all'>Apply Filters</button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default ProductsFilter