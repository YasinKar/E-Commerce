import React from 'react'
import FAQ from '@/components/FAQ';
import { getContents } from '@/utils/actions/content.actions';

const FAQPage = async () => {
  const context = await getContents()

  return (
    <main className='container my-8'>
      <FAQ faq={context.faq} />
    </main>
  )
}

export default FAQPage