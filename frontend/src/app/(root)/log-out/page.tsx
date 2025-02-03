'use client'

import Loading from '@/components/Loading';
import { AuthContext, AuthContextType } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const page = () => {
    const { signOut } = useContext(AuthContext) as AuthContextType;
    const router = useRouter();

    useEffect(() => {
        signOut()
        router.push('/');
    }, []);

    return <Loading />
}

export default page