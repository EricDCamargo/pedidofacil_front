'use client'

import { TableProps } from '@/types/table.type'
import { LayoutGrid } from 'lucide-react'
import { TableContext } from '@/contexts/table'
import { useContext } from 'react'
import ConfirmModal from '@/app/dashboard/_components/modals/confirm'
import TableModal from '../tableModal/modal'
import PageLayout from '@/app/dashboard/_components/PageLayout/pageLayout'
import { TableList } from '@/app/dashboard/_components/tableList/TableList'

interface TablesPageProps {
  tables: TableProps[] | []
}

export default function TablesPage({ tables }: TablesPageProps) {
  const {
    currentTable,
    isConfirmModalOpen,
    handleDeleteTable,
    setcurrentTable,
    setConfirmModalOpen,
    setTableModalOpen,
    setOnEdition
  } = useContext(TableContext)

  const handleAddTable = () => {
    setTableModalOpen(true)
    setOnEdition(false)
  }
  const handleCancel = () => {
    setConfirmModalOpen(false)
  }
  const handleEdit = (table: TableProps) => {
    setcurrentTable(table)
    setTableModalOpen(true)
  }

  return (
    <PageLayout
      headerProps={{
        title: 'Lista de Mesas',
        button: {
          buttonLabel: 'Adicionar Mesa',
          buttonIcon: <LayoutGrid />,
          onButtonClick: handleAddTable
        }
      }}
    >
      <TableList tables={tables} onTableClick={handleEdit} />

      <TableModal />
      <ConfirmModal
        modalText={{
          title: 'Remover mesa ' + currentTable.number,
          message: (
            <>
              Tem certeza quer remover a mesa? <br />
              <br />
              {currentTable.status}
            </>
          )
        }}
        isOpen={isConfirmModalOpen}
        onCancel={handleCancel}
        onConfirm={handleDeleteTable}
      />
    </PageLayout>
  )
}
