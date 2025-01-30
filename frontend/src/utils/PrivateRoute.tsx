'use client'

import React, { useContext, useEffect } from 'react'
import { AuthContext, AuthContextType } from "@/context/AuthContext"
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

type PrivateRouteProps = {
    children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user } = useContext(AuthContext) as AuthContextType

    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return <Loading />;
    }

    return children
}

export default PrivateRoute