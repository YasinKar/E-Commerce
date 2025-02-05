import ContactForm from '@/components/ContactForm'
import { getSettings } from '@/utils/actions/content.actions';
import React from 'react'

export async function generateMetadata() {
    const settings = await getSettings();

    return {
        title: `${settings.site_name} | Contact Us`,
    }
}

const ContactUs = () => {
  return (
    <main className='container my-8'>
      <ContactForm />
    </main>
  )
}

export default ContactUs