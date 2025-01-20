import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'
import Table from './table/table'
import styles from './styles.module.css'
import { UserRoundPlus } from 'lucide-react'
export default async function Users() {
  return (
    <div className={styles.container}>
      <div className={styles.userHeader}>
        <h1>Usuários</h1>
        <div className={styles.addUser}>
          <p> Adicionar usuario</p>

          <UserRoundPlus />
        </div>
      </div>
      <Table />
    </div>
  )
}
