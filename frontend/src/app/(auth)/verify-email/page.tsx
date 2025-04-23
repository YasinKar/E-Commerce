import OTPForm from '@/components/OTPForm';
import { getSettings } from '@/utils/actions/content.actions';
import React from 'react'

export async function generateMetadata() {
    const settings = await getSettings();

    return {
        title: `${settings.site_name} | Verify Email`,
    }
}

const OTP = () => {
    return <OTPForm />
}

export default OTP