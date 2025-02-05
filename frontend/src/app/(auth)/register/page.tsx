import AuthForm from '@/components/AuthForm'
import { getSettings } from '@/utils/actions/content.actions';
import React from 'react'

export async function generateMetadata() {
    const settings = await getSettings();

    return {
        title: `${settings.site_name} | Register`,
    }
}

const Register = () => {
  return <AuthForm type='register'/>
}

export default Register