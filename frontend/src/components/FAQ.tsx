"use client";

import { FAQ as FAQType } from '@/types/siteContent.types';
import React, { useState } from 'react'

type FAQProps = {
    faq: FAQType[]
}

const FAQ: React.FC<FAQProps> = ({ faq }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className='section'>
            <h2 className='title'>FAQ & Help</h2>
            <div className="w-full divide-y">
                {faq.map((item, index) => (
                    <div key={item.id}>
                        <button
                            className="w-full flex justify-between items-center p-4 bg-white text-black font-medium focus:outline-none"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span>{item.question}</span>
                            <svg
                                className={`w-5 h-5 transform transition-all ${activeIndex === index ? "rotate-180" : "rotate-0"
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {activeIndex === index && (
                            <div className="px-4 py-2 bg-white text-gray-600">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FAQ