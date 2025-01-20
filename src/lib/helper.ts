import { OrderProps } from '@/providers/order'

export function calculateTotalOrder(orders: OrderProps) {
  return orders.items.reduce((total, item) => {
    const itemTotal = item.product.price * item.amount
    return total + itemTotal
  }, 0)
}
