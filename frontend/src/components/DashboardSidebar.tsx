import { User } from '@/types/user.types'
import Image from 'next/image'
import React from 'react'

type DashboardSidebarProps = {
    user: User
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
    return (
        <div className='col-span-4 row-span-2 hidden lg:block xl:col-span-3'>
            <div className="w-[300px] sticky top-32 mb-4 border-r border-b border-gray-300">
                <div className="flex max-h-full flex-col">
                    <div className="flex h-full flex-col gap-4 p-4">
                        <div className="flex items-center justify-between pb-0">
                            <h1>{user.username}</h1>
                        </div>
                        {/* <div className="grow">
                            <ul className="divide-y">
                                <li className='py-3'>
                                    <label className="flex justify-between items-center cursor-pointer text">
                                        <span >Special Sale Products</span>
                                        <input type="checkbox" name='on_sale' className="sr-only peer" onChange={() => setFilters(prev => ({ ...prev, on_sale: true }))} />
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"></div>
                                    </label>
                                </li>
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardSidebar