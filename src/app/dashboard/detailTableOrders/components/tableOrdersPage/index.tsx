'use client'

import styles from './styles.module.css'
import { useContext } from 'react'
import { OrderContext } from '@/providers/order'
import { ArrowBigLeft, Eye, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import OrderModal from '../../../components/modalOrder'
import DataTable from '../../../components/dataTable/dataTable'
import { OrderProps } from '@/types/order.type'
import { formatCurrency } from '@/utils'
import { TableColumn } from '@/types/dataTable.type'
import { getLabel } from '@/utils/recordStatus'

interface DetailTableOrdersPage {
  currentOrders: OrderProps[]
}

export default function DetailTableOrdersPage({
  currentOrders
}: DetailTableOrdersPage) {
  const {
    isOrderModalOpen,
    selectedOrder,
    setOrderModalOpen,
    setSelectedOrder
  } = useContext(OrderContext)
  const router = useRouter()

  const handlePreviousPage = () => {
    router.push('/dashboard')
  }

  const handleViewOrder = (order: OrderProps) => {
    setSelectedOrder(order)
    setOrderModalOpen(true)
  }
  const handleDeleteOrder = (order: OrderProps) => {}

  const columns: TableColumn<OrderProps>[] = [
    { name: 'Pedido N°', selector: row => row.number },
    {
      name: 'Status',
      selector: row => getLabel(row.status)
    },
    { name: 'Cliente', selector: row => row.name },
    { name: 'Total', selector: row => formatCurrency(row.total.toString()) },
    {
      name: 'Ações',
      cell: row => (
        <div className={'actions'}>
          <button onClick={() => handleViewOrder(row)}>
            <Eye />
          </button>
          <button onClick={() => handleDeleteOrder(row)}>
            <Trash2 />
          </button>
        </div>
      )
    }
  ]

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
        {currentOrders.length === 0 ? (
          <span className={styles.emptyItem}>
            Nenhum pedido aberto no momento...
          </span>
        ) : (
          <DataTable columns={columns} data={currentOrders} />
        )}
      </section>

      <OrderModal
        isOpen={isOrderModalOpen}
        order={selectedOrder!}
        onClose={() => setOrderModalOpen(false)}
      />
    </main>
  )
}
