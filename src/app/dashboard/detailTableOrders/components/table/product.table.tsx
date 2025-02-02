import styles from './product.module.css'
import { Trash2, Eye } from 'lucide-react'
import { useContext } from 'react'
import { formatCurrency } from '@/utils'
import { OrderProps } from '@/types/order.type'
import { OrderContext } from '@/providers/order'

interface OrderTableProps {
  orders: OrderProps[]
}
export default function OrderTable({ orders }: OrderTableProps) {
  const { setSelectedOrder, setOrderModalOpen } = useContext(OrderContext)

  const handleViewOrder = (order: OrderProps) => {
    setSelectedOrder(order)
    setOrderModalOpen(true)
  }
  const handleDeleteOrder = (order: OrderProps) => {}
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCell}>Pedido N°</th>
              <th className={styles.tableCell}>Status</th>
              <th className={styles.tableCell}>Cliente</th>
              <th className={styles.tableCell}>Total</th>
              <th className={styles.tableCell}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, key) => (
              <tr key={key} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <p>{order.number}</p>
                </td>
                <td className={styles.tableCell}>
                  <p>{order.status}</p>
                </td>
                <td className={styles.tableCell}>
                  <p>{order.name}</p>
                </td>
                <td className={styles.tableCell}>
                  <p>{formatCurrency(order.total.toString())}</p>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button onClick={() => handleViewOrder(order)}>
                      <Eye />
                    </button>
                    <button onClick={() => handleDeleteOrder(order)}>
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
