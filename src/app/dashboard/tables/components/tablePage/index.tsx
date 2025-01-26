'use client'

import { useRouter } from 'next/navigation'
import styles from './styles.module.css'
import { Table, TableStatus } from '@/lib/table.type'
import { LayoutGrid } from 'lucide-react'

interface TablesPageProps {
  tables: Table[] | []
}

export default function TablesPage({ tables }: TablesPageProps) {
  const router = useRouter()

  const handleAddTable = () => {}

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
              table.status === TableStatus.available
                ? styles.available
                : styles.occupied
            }`}
          >
            <LayoutGrid />
            <div>
              <h2>Mesa {table.number}</h2>
              <p>Status: {table.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
