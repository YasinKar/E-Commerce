import AuthForm from '@/components/AuthForm'
import { getSettings } from '@/utils/actions/content.actions';
import React from 'react'

export async function generateMetadata() {
    const settings = await getSettings();

    return {
        title: `${settings.site_name} | Login`,
    }
}

const Login = () => {
  return <AuthForm type='login'/>
}

export default Login