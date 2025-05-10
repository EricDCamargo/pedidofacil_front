'use client'

import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TableProps } from '@/types/table.type'
import { useState } from 'react'
import PageLayout from '../_components/PageLayout/pageLayout'
import { getTables } from '@/services/retriveSSRData/retriveTableData'
import { TableList } from '../_components/tableList/TableList'

interface Props {
  tablesData: TableProps[]
}

export function TableOrders({ tablesData }: Props) {
  const router = useRouter()

  const [tables, setTables] = useState<TableProps[]>(tablesData)

  const handleDetailTableOrders = (table: TableProps) => {
    router.push(`/dashboard/detailTableOrders/${table.id}`)
  }

  async function handleRefresh() {
    setTables(await getTables())
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
      <TableList tables={tables} onTableClick={handleDetailTableOrders} />
    </PageLayout>
  )
}
