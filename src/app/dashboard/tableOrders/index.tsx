'use client'

import styles from './styles.module.css'
import { LayoutGrid, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TableProps } from '@/types/table.type'
import { getLabel, TableStatus } from '@/utils/recordStatus'

interface Props {
  tables: TableProps[]
}

export function TableOrders({ tables }: Props) {
  const router = useRouter()

  const handleDetailTableOrders = (table_id: string) => {
    router.push(`/dashboard/detailTableOrders/${table_id}`)
  }

  function handleRefresh() {
    router.refresh()
    toast.success('Mesas atualizadas com sucesso!')
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Messas pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listTables}>
          {tables.length === 0 && (
            <span className={styles.emptyItem}>Nenhuma mesa disponivel...</span>
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
                  <p>Status: {getLabel(table.status)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
