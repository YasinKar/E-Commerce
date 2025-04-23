'use client'

import AccountForm from '@/components/AccountForm'
import { User } from '@/types/user.types'
import { getUser } from '@/utils/actions/user.actions'
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Account = () => {
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

    return <AccountForm user={user} />
}

export default Account