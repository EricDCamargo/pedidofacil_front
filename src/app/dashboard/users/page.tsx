import Table from './table/table'
import styles from './styles.module.css'
import { UserRoundPlus } from 'lucide-react'
import { UserProps } from '@/types/user'
import UserModal from './usermodal/modal'
export default async function Users() {
  const packageData: UserProps[] = [
    {
      id: '1',
      name: 'Premium',
      email: 'john.doe@example.com',
      role: 'admin',
      created_at: '2022-01-01 10:00:00',
      updated_at: '2022-01-01 10:00:00'
    },
    {
      id: '2',
      name: 'Premium',
      email: 'john.doe@example.com',
      role: 'admin',
      created_at: '2022-01-01 10:00:00',
      updated_at: '2022-01-01 10:00:00'
    }
  ]
  return (
    <div className={styles.container}>
      <div className={styles.userHeader}>
        <h1>Usuários</h1>
        <button className={styles.addUser}>
          <p> Adicionar usuario</p>
          <UserRoundPlus />
        </button>
      </div>
      <Table users={packageData} />
      <UserModal />
    </div>
  )
}
