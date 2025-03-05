'use client'

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react'
import { TableProps } from '@/types/table.type'
import { TableStatus } from '@/utils/recordStatus'
import { serviceConsumer } from '@/services/service.consumer'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type TableContextData = {
  newTable: TableProps
  isTableModalOpen: boolean
  isConfirmModalOpen: boolean
  onEdition: boolean
  currentTable: TableProps

  setOnEdition: Dispatch<SetStateAction<boolean>>
  setcurrentTable: Dispatch<SetStateAction<TableProps>>
  setTableModalOpen: Dispatch<SetStateAction<boolean>>
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>
  handleDeleteTable: () => Promise<void>
  handleTableSubmit: (DATA: { status: string; number: number }) => Promise<void>
}

type TableProviderProps = {
  children: ReactNode
}
export const newTable: TableProps = {
  id: '',
  number: '',
  status: TableStatus.AVAILABLE,
  created_at: '',
  updated_at: ''
}
export const TableContext = createContext({} as TableContextData)

export function TableProvider({ children }: TableProviderProps) {
  const router = useRouter()
  const [isTableModalOpen, setTableModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

  const [onEdition, setOnEdition] = useState<boolean>(true)
  const [currentTable, setcurrentTable] = useState<TableProps>(newTable)

  const handleTableSubmit = useCallback(
    async (DATA: { status: string; number: number }) => {
      const isUpdate = !!currentTable.id
      try {
        const res = isUpdate
          ? await serviceConsumer().executePut(
              '/table/status',
              {},
              {
                table_id: currentTable.id,
                status: DATA.status
              }
            )
          : await serviceConsumer().executePost('/table', {
              number: DATA.number as number
            })
        if (
          res.isOk &&
          (res.status === StatusCodes.CREATED || res.status === StatusCodes.OK)
        ) {
          toast.success(res.message)
          setTableModalOpen(false)
          setcurrentTable(newTable)
          setOnEdition(true)
          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error(`Erro ao ${isUpdate ? 'editar' : 'cadastrar'} mesa!`)
        setOnEdition(true)
      }
    },
    [currentTable]
  )

  const handleDeleteTable = async () => {
    if (!currentTable.id) {
      return
    }
    try {
      const res = await serviceConsumer().executeDelete('/table', {
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
        setOnEdition,
        handleDeleteTable,
        handleTableSubmit
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
