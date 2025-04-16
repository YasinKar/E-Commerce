import OTPForm from '@/components/OTPForm';
import { getSettings } from '@/utils/actions/content.actions';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata() {
    const settings = await getSettings();

    return {
        title: `${settings.site_name} | Verify Email`,
    }
}

type OTPProps = {
    searchParams: Record<string, string | string[] | undefined>;
}

const OTP = async ({ searchParams }: OTPProps) => {
    searchParams = await searchParams
    const email = searchParams.email as string
    console.log(email);

    if (!email) {
        notFound();
    }

    return <OTPForm email={email} />
}

export default OTP