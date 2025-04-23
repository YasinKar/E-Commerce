'use client'

import DashboardSidebar from "@/components/DashboardSidebar";
import { User } from "@/types/user.types";
import { getUser } from "@/utils/actions/user.actions";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser()
            setUser(user)
        }

        fetchUser()
    }, [])

    if (!user) {
        notFound()
    }

    return (
        <div className='flex'>
            <DashboardSidebar user={user} />
            <div className='w-full p-5'>
                {children}
            </div>
        </div>
    );
}