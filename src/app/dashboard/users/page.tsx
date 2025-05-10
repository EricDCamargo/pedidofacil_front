import { getUsers } from '@/services/retriveSSRData/retriveUserData'
import UsersPage from './components/usersPage'

export default async function Users() {
  const packageData = await getUsers()

  return <UsersPage users={packageData} />
}
