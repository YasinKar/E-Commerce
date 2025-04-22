'use client'

import Loading from '@/components/Loading';
import { AuthContext, AuthContextType } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const Logout = () => {
    const { signOut } = useContext(AuthContext) as AuthContextType;
    const router = useRouter();

    useEffect(() => {
        signOut()
        router.push('/');
    }, [signOut, router]);

    return <Loading />
}

export default Logout