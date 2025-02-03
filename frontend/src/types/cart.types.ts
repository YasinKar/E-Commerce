import { Product } from "./product.types"
import { Address } from "./user.types"

export interface Order {
    id: number
    cart: number
    product: Product
    count: number
    size: string
    color: string
}

export interface Cart {
    id: number,
    user: number,
    address: Address,
    status: 'pending_payment' | 'processing' | 'out_for_delivery' | 'delivered',
    offer_code: string,
    is_paid: boolean,
    paid: string,
    paid_date: string,
    orders: Order[]
    total_amount: string
}