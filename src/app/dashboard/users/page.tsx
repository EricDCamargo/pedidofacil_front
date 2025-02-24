import UsersPage from './usersPage'
import { getUsers } from '@/services/retriveSSRData/retriveUserData'


export default async function Users() {
  const packageData = await getUsers()

  return <UsersPage users={packageData} />
}