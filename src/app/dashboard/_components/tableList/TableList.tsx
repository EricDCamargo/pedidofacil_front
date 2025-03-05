import { getLabel, TableStatus } from '@/utils/recordStatus'
import { TableProps } from '@/types/table.type'
import { LayoutGrid } from 'lucide-react'
import styles from './styles.module.css'

interface TableItemProps {
  table: TableProps
  onClick: (table: TableProps) => void
}

interface TableListProps {
  tables: TableProps[]
  onTableClick: (table: TableProps) => void
}

const statusClass = {
  [TableStatus.AVAILABLE]: styles.available,
  [TableStatus.OCCUPIED]: styles.occupied
}

const TableItem = ({ table, onClick }: TableItemProps) => {
  return (
    <div
      className={`${styles.tableItem} ${statusClass[table.status]}`}
      onClick={() => onClick(table)}
    >
      <LayoutGrid />
      <div>
        <h2>Mesa {table.number}</h2>
        <p>Status: {getLabel(table.status)}</p>
      </div>
    </div>
  )
}

export function TableList({ tables, onTableClick }: TableListProps) {
  if (tables.length === 0) {
    return <span className={styles.emptyItem}>Nenhuma mesa disponível...</span>
  }

  return (
    <div className={styles.tableList}>
      {tables.map(table => (
        <TableItem key={table.id} table={table} onClick={onTableClick} />
      ))}
    </div>
  )
}
