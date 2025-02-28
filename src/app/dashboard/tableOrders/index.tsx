'use client'

import styles from './styles.module.css'
import { LayoutGrid, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TableProps } from '@/types/table.type'
import { getLabel, TableStatus } from '@/utils/recordStatus'
import { useState } from 'react'
import PageLayout from '../_components/PageLayout/pageLayout'

interface Props {
  tablesData: TableProps[]
}

export function TableOrders({ tablesData }: Props) {
  const router = useRouter()

  const [tables, setTables] = useState<TableProps[]>(tablesData)

  const handleDetailTableOrders = (table_id: string) => {
    router.push(`/dashboard/detailTableOrders/${table_id}`)
  }

  function handleRefresh() {
    router.refresh()
    toast.success('Mesas atualizadas com sucesso!')
  }

  return (
    <PageLayout
      headerProps={{
        title: 'Messas pedidos',
        button: {
          buttonLabel: 'Atualizar',
          buttonIcon: <RefreshCw size={24} color="#3fffa3" />,
          onButtonClick: handleRefresh
        }
      }}
    >
      {tables[0] ? (
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
      ) : (
        <span className={styles.emptyItem}>Nenhuma mesa disponivel...</span>
      )}
    </PageLayout>
  )
}
