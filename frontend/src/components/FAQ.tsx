"use client";

import { FAQ as FAQType } from '@/types/siteContent.types';
import { ChevronRight } from 'lucide-react';
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
                {
                    faq &&
                    faq.map((item, index) => (
                        <div key={item.id} >
                            <button
                                className="w-full flex justify-between items-center p-4 bg-white text-black font-medium focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span>{item.question}</span>
                                <ChevronRight className={`${activeIndex === index ? 'rotate-90' : ''} transition-all`} />
                            </button>
                            <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeIndex === index ? "max-h-[500px]" : "max-h-0"}`}>
                                <div className='px-4 py-2 bg-white text-gray-600 '>
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default FAQ