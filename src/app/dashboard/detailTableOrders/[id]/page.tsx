'use client'

import styles from './styles.module.css'
import { useContext, useEffect } from 'react'
import { OrderContext } from '@/providers/order'
import { ArrowBigLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import OrderTable from '../components/table/product.table'
import OrderModal from '../../components/modalOrder'

export default function DetailTableOrders() {
  const router = useRouter()
  const {
    isOrderModalOpen,
    setOrderModalOpen,
    currentOrders,
    selectedOrder,
    setCurrentOrders
  } = useContext(OrderContext)

  const handlePreviousPage = () => {
    router.push('/dashboard')
  }
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <button onClick={handlePreviousPage}>
            <ArrowBigLeft size={40} />
          </button>
          <h1>Detalhes da Mesa</h1>
        </div>
      </header>

      <section className={styles.listOrders}>
        {currentOrders.length === 0 && (
          <span className={styles.emptyItem}>
            Nenhum pedido aberto no momento...
          </span>
        )}
      </section>

      <OrderTable orders={currentOrders} />
      <OrderModal
        isOpen={isOrderModalOpen}
        order={selectedOrder!}
        onClose={() => setOrderModalOpen(false)}
      />
    </main>
  )
}
