'use client'

import { useRouter } from 'next/navigation'
import styles from './styles.module.css'
import { Table, TableStatus } from '@/types/table.type'
import { LayoutGrid } from 'lucide-react'
import { TableContext } from '@/providers/table'
import { useContext } from 'react'
import { serviceConsumer } from '@/services/service.consumer'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'sonner'
import ConfirmModal from '@/app/dashboard/components/modals/confirm'
import TableModal from '../tableModal/modal'

interface TablesPageProps {
  tables: Table[] | []
}

export default function TablesPage({ tables }: TablesPageProps) {
  const router = useRouter()

  const {
    currentTable,
    newTable,
    isConfirmModalOpen,
    setcurrentTable,
    setConfirmModalOpen,
    setTableModalOpen,
    setOnEdition
  } = useContext(TableContext)

  const handleDelete = async () => {
    if (!currentTable.id) {
      return
    }
    try {
      const res = await serviceConsumer('').executeDelete('/table', {
        table_id: currentTable.id
      })
      if (res.isOk && res.status === StatusCodes.OK) {
        toast.success(res.message)
        setConfirmModalOpen(false)
        setTableModalOpen(false)
        setcurrentTable(newTable)
        router.refresh()
      } else {
        toast.error(res.message)
        console.log(res)
      }
    } catch (err) {
      console.log(err)
      toast.error('Erro ao remover mesa!')
    }
  }

  const handleAddTable = () => {
    setTableModalOpen(true)
    setOnEdition(false)
  }
  const handleCancel = () => {
    setConfirmModalOpen(false)
  }
  const handleEdit = (table: Table) => {
    setcurrentTable(table)
    setTableModalOpen(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h1>Lista de Mesas</h1>
        <button className={styles.addTable} onClick={handleAddTable}>
          <p> Adicionar Mesa</p>
          <LayoutGrid />
        </button>
      </div>
      <div className={styles.tableList}>
        {tables.map(table => (
          <div
            key={table.id}
            className={`${styles.tableItem} ${
              table.status === TableStatus.AVAILABLE
                ? styles.available
                : styles.occupied
            }`}
            onClick={() => handleEdit(table)}
          >
            <LayoutGrid />
            <div>
              <h2>Mesa {table.number}</h2>
              <p>Status: {table.status}</p>
            </div>
          </div>
        ))}
      </div>
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
        onConfirm={handleDelete}
      />
    </div>
  )
}
