import DashboardSidebar from '@/components/DashboardSidebar';
import { getUser } from '@/utils/actions/user.actions';
import PrivateRoute from '@/utils/PrivateRoute';
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async () => {
    let user
    try {
        user = await getUser()
    } catch (error) {
        console.error(error);
        redirect('/login')
    }

    return (
        <PrivateRoute>
            <div className='flex'>
                <DashboardSidebar user={user} />
            </div>
        </PrivateRoute>
    )
}

export default Dashboard