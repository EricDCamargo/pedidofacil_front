import { getLogs } from '@/services/retriveSSRData/retriveLogData'
import LogsPage from './logsPage'
import { getUsers } from '@/services/retriveSSRData/retriveUserData'
export default async function Logs() {
  const logs = await getLogs()
  const users = await getUsers()
  return <LogsPage initialLogs={logs} users={users} />
}
