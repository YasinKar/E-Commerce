'use client'

import DashboardOrders from '@/components/DashboardOrders';
import { notFound, useSearchParams } from 'next/navigation';
import React from 'react'

const Orders = () => {
    const searchParams = useSearchParams()
    const status = searchParams.get('status')!

    if (
        status !== 'delivered' &&
        status !== 'processing' &&
        status !== 'out_for_delivery' &&
        status !== 'pending_payment'
    ) {
        notFound()
    }

    return <DashboardOrders status={status} />
}

export default Orders