'use client'

import styles from './styles.module.css'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'
import { calculateTotalOrder } from '@/lib/helper'
import { OrderProps } from '@/types/order.type'

interface OrderModalProps {
  isOpen: boolean
  order: OrderProps
  onClose: () => void
}

const OrderModal = ({ isOpen, order, onClose }: OrderModalProps) => {
  async function handleFinishOrder() {}
  if (isOpen) {
    return (
      <dialog className={styles.dialogContainer}>
        <section className={styles.dialogContent}>
          <button className={styles.dialogBack} onClick={onClose}>
            <X size={40} color="#FF3f4b" />
          </button>

          <article className={styles.container}>
            <h2>Detalhes do pedido</h2>

            <span className={styles.table}>
              Pedido <b>{order.number}</b>
            </span>

            {order?.name && (
              <span className={styles.name}>
                <b>{order.name}</b>
              </span>
            )}

            {order.items.map(item => (
              <section className={styles.item} key={item.id}>
                <span>
                  Qtd: {item.amount} - <b>{item.product.name}</b> - R${' '}
                  {item.product.price * item.amount}
                </span>
                <span className={styles.description}>
                  {item.product.description}
                </span>
              </section>
            ))}

            <h3 className={styles.total}>
              Valor total: R$ {calculateTotalOrder(order)}
            </h3>

            <button className={styles.buttonOrder} onClick={handleFinishOrder}>
              Concluir pedido
            </button>
          </article>
        </section>
      </dialog>
    )
  }
  return null
}
export default OrderModal
