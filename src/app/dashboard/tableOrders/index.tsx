'use client'

import { use, useEffect } from 'react'
import styles from './styles.module.css'
import { LayoutGrid, RefreshCw } from 'lucide-react'
import { OrderContext } from '@/providers/order'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TableProps, TableStatus } from '@/types/table.type'
import { serviceConsumer } from '@/services/service.consumer'
import { StatusCodes } from 'http-status-codes'

interface Props {
  tables: TableProps[]
}

export function TableOrders({ tables }: Props) {
  const { setCurrentOrders, currentOrders } = use(OrderContext)
  const router = useRouter()

  useEffect(() => {
    console.log(currentOrders)
  }, [])

  async function handleDetailTableOrders(table_id: string) {
    //should fetch '/orders?table_id=id' to return the oders related to this table
    try {
      const res = await serviceConsumer('').executeGet('/orders', { table_id })

      if (res.isOk && res.status === StatusCodes.OK) {
        setCurrentOrders(res.data)
        toast.success(res.message)
        router.push(`/dashboard/detailTableOrders/${table_id}`)
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      console.log(err)
      toast.error('Falha ao carregar os pedidos!')
      return
    }
  }

  function handleRefresh() {
    router.refresh()
    toast.success('Mesas atualizados com sucesso!')
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {tables.length === 0 && (
            <span className={styles.emptyItem}>
              Nenhum pedido aberto no momento...
            </span>
          )}
          <div className={styles.tableList}>
            {tables.map(table => (
              <div
                key={table.id}
                className={`${styles.tableItem} ${
                  table.status === TableStatus.AVAILABLE
                    ? styles.available
                    : styles.occupied
                }`}
                onClick={() => handleDetailTableOrders(table.id)}
              >
                <LayoutGrid />
                <div>
                  <h2>Mesa {table.number}</h2>
                  <p>Status: {table.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
