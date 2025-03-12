import AccountForm from '@/components/AccountForm'
import { getUser } from '@/utils/actions/user.actions'
import React from 'react'

const page = async () => {
    const user = await getUser()

    return <AccountForm user={user}/>
}

export default page