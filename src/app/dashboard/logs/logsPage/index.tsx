'use client'

import { LogProps } from '@/types/log.type'
import PageLayout from '../../_components/PageLayout/pageLayout'
import { TableColumn } from '@/types/dataTable.type'
import DataTable from '../../_components/dataTable/dataTable'
import { UserProps } from '@/types/user.type'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '@/contexts/user'
import { getUserOptions } from '@/utils'
import Dropdown from '../../_components/dropDown'
import { getLogs } from '@/services/retriveSSRData/retriveLogData'
import { DateInput } from '../../_components/dateInput/dateInput'
import { Search } from 'lucide-react'
import { socket, SocketEvents } from '@/socket'

interface LogsPageProps {
  initialLogs: LogProps[]
  users: UserProps[]
}

export default function LogsPage({ initialLogs, users }: LogsPageProps) {
  const { selectedUser, setSelectedUser } = useContext(UserContext)

  const [currentLogs, setCurrentLogs] = useState<LogProps[]>(initialLogs)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const fetchUsers = useCallback(async () => {
    const NewUsersList = await getLogs({
      user_id: selectedUser,
      startDate: startDate || undefined,
      endDate: endDate || undefined
    })
    setCurrentLogs(NewUsersList)
  }, [selectedUser, startDate, endDate])

  useEffect(() => {
    const onLogCreated = () => {
      fetchUsers()
    }

    socket.on(SocketEvents.LOG_CREATED, onLogCreated)
    return () => {
      socket.off(SocketEvents.LOG_CREATED, onLogCreated)
    }
  }, [fetchUsers])

  const optionsWithAll = [
    { label: 'Todos', value: '' },
    ...getUserOptions(users)
  ]
  const columns: TableColumn<LogProps>[] = [
    {
      name: 'Data/Hora',
      selector: row => new Date(row.created_at).toLocaleString()
    },
    { name: 'Usuário', selector: row => row.user?.name || 'Sistema' },
    { name: 'E-mail', selector: row => row.user?.email || '-' },
    { name: 'Rota', selector: row => row.route },
    { name: 'Método', selector: row => row.method },
    {
      name: 'Detalhes',
      selector: row => (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            maxWidth: 300
          }}
        >
          {row.details}
        </pre>
      )
    }
  ]
  return (
    <PageLayout
      headerProps={{
        title: 'Logs do sistema',
        button: {
          buttonLabel: 'Buscar usuários',
          buttonIcon: <Search />,
          onButtonClick: fetchUsers
        },
        children: (
          <>
            <Dropdown
              defaultValue={selectedUser}
              options={optionsWithAll}
              name={'user_id'}
              onChange={setSelectedUser}
            />
            <DateInput
              value={startDate}
              onChange={setStartDate}
              name="startDate"
              label="Data inicial"
              type="datetime-local"
            />
            <DateInput
              value={endDate}
              onChange={setEndDate}
              name="endDate"
              label="Data final"
              type="datetime-local"
            />
          </>
        )
      }}
    >
      <DataTable columns={columns} data={currentLogs} />
    </PageLayout>
  )
}
