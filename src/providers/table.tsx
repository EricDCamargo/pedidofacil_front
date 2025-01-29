'use client'

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import { Table, TableStatus } from '@/types/table.type'

type TableContextData = {
  newTable: Table
  isTableModalOpen: boolean
  isConfirmModalOpen: boolean
  onEdition: boolean
  currentTable: Table

  setOnEdition: Dispatch<SetStateAction<boolean>>
  setcurrentTable: Dispatch<SetStateAction<Table>>
  setTableModalOpen: Dispatch<SetStateAction<boolean>>
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>
}

type TableProviderProps = {
  children: ReactNode
}
export const newTable: Table = {
  id: '',
  number: '',
  status: TableStatus.AVAILABLE,
  created_at: '',
  updated_at: ''
}
export const TableContext = createContext({} as TableContextData)

export function TableProvider({ children }: TableProviderProps) {
  const [isTableModalOpen, setTableModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

  const [onEdition, setOnEdition] = useState<boolean>(true)
  const [currentTable, setcurrentTable] = useState<Table>(newTable)

  return (
    <TableContext.Provider
      value={{
        onEdition,
        isConfirmModalOpen,
        currentTable,
        isTableModalOpen,
        newTable,
        setcurrentTable,
        setTableModalOpen,
        setConfirmModalOpen,
        setOnEdition
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
