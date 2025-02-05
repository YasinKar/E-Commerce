import React from 'react'
import FAQ from '@/components/FAQ';
import { getFAQ, getSettings } from '@/utils/actions/content.actions';

export async function generateMetadata() {
    const settings = await getSettings();

    return {
        title: `${settings.site_name} | FAQ & Help`,
    }
}

const FAQPage = async () => {
  const faq = await getFAQ()

  return (
    <main className='container my-8'>
      <FAQ faq={faq} />
    </main>
  )
}

export default FAQPage