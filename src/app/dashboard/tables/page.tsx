import TablesPage from './components/tablePage'
import { getTables } from '@/services/retriveSSRData/retriveTableData'

export default async function Tables() {
  const tables = await getTables()
  return <TablesPage tables={tables} />
}
