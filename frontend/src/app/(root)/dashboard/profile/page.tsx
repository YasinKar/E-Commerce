import ProfileForm from '@/components/ProfileForm'
import { getUser } from '@/utils/actions/user.actions'
import React from 'react'

const page = async () => {
    const user = await getUser()

    return <ProfileForm user={user}/>
}

export default page