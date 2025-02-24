'use client'

import DataTable from '@/app/dashboard/components/dataTable/dataTable'
import Dropdown from '@/app/dashboard/components/dropDown'
import OrderModal from '@/app/dashboard/components/modalOrder'
import { TableColumn } from '@/types/dataTable.type'
import { OrderProps } from '@/types/order.type'
import { formatCurrency } from '@/utils'
import { getLabel, OrderStatus } from '@/utils/recordStatus'
import { Eye, Trash2 } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { OrderContext } from '@/providers/order'

interface OrdersPageProps {
  orders: OrderProps[]
}

export default function OrdersPage({ orders }: OrdersPageProps) {
  const {
    isOrderModalOpen,
    selectedOrder,
    setOrderModalOpen,
    setSelectedOrder,
    handleDeleteOrder
  } = useContext(OrderContext)
  const [clientName, setClientName] = useState<string>('')
  const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>(orders)

  const uniqueOrderNames = Array.from(new Set(orders.map(order => order.name)))

  const optionsWithAll = [
    { label: 'Todos', value: '' },
    ...uniqueOrderNames.map(name => ({ label: name, value: name }))
  ]

  useEffect(() => {
    const newOrders =
      clientName === ''
        ? orders
        : orders.filter(order => order.name.includes(clientName))
    setFilteredOrders(newOrders)
  }, [clientName, orders])

  const handleViewOrder = (order: OrderProps) => {
    setSelectedOrder(order)
    setOrderModalOpen(true)
  }

  const columns: TableColumn<OrderProps>[] = [
    { name: 'Pedido N°', selector: row => row.number },
    {
      name: 'Status',
      cell: row => {
        const statusClass = {
          [OrderStatus.DRAFT]: styles.draft,
          [OrderStatus.IN_PROGRESS]: styles.inProgress,
          [OrderStatus.COMPLETED]: styles.completed,
          [OrderStatus.PAID]: styles.paid,
          [OrderStatus.CLOSED]: styles.closed
        }[row.status] // Obtém a classe correspondente ao status

        return (
          <p className={`${styles.status} ${statusClass || ''}`}>
            {getLabel(row.status)}
          </p>
        )
      }
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
          <h1 className={styles.title}>Todos os pedidos</h1>
        </div>

        <Dropdown
          defaultValue={clientName}
          options={optionsWithAll}
          name={'clientName'}
          onChange={setClientName}
        />
      </header>

      <section className={styles.listOrders}>
        {orders.length === 0 ? (
          <span className={styles.emptyItem}>
            Nenhum pedido aberto no momento...
          </span>
        ) : (
          <DataTable columns={columns} data={filteredOrders} />
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
