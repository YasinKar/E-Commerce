import React from 'react'
import FAQ from '@/components/FAQ';
import { getFAQ } from '@/utils/actions/content.actions';

const FAQPage = async () => {
  const faq = await getFAQ()

  return (
    <main className='container my-8'>
      <FAQ faq={faq} />
    </main>
  )
}

export default FAQPage