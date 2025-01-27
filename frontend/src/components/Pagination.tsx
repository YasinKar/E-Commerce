'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

type PaginationProps = {
    next: string | null
    previous: string | null
    currentPage: number
    count: number
}

const Pagination: React.FC<PaginationProps> = ({ next, previous, currentPage, count }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(count / 1)

    const handlePageChange = (page: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);
        router.push(`/products?${params.toString()}`);
    };

    return (
        <nav>
            <ul className="flex items-center -space-x-px h-10 text-base gap-2">
                {
                    previous &&
                    <li>
                        <button
                            onClick={() => handlePageChange((currentPage - 1).toString())}
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-lg">
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="size-4 rtl:rotate-180" />
                        </button>
                    </li>
                }
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => handlePageChange(page.toString())}
                            className={page === currentPage ? "z-10 flex items-center justify-center px-4 h-10 leading-tight text-sky-500 border border-sky-500 hover:bg-sky-100 rounded-lg" : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-lg"} >
                            {page}
                        </button>
                    </li>
                ))}
                {
                    next &&
                    <li>
                        <button
                            onClick={() => handlePageChange((currentPage + 1).toString())}
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 rounded-lg">
                            <span className="sr-only">Next</span>
                            <ChevronRight className="size-4 rtl:rotate-180" />
                        </button>
                    </li>
                }
            </ul>
        </nav >

    )
}

export default Pagination