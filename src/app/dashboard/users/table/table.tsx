import { UserProps, UserRole } from '@/types/user'
import styles from './table.module.css'
import { Trash2, Eye } from 'lucide-react'
import { use } from 'react'
import { UserContext } from '@/providers/user'

interface TableProps {
  users: UserProps[]
}
export default function Table({ users }: TableProps) {
  const { setcurrentUser, setUserModalOpen } = use(UserContext)

  const handleUser = (user: UserProps) => {
    setcurrentUser(user)
    setUserModalOpen(true)
  }
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCell}>Nome</th>
              <th className={styles.tableCell}>Email</th>
              <th className={styles.tableCell}>Permissão</th>
              <th className={styles.tableCell}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={key} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <p>{user.name}</p>
                </td>
                <td className={styles.tableCell}>
                  <p>{user.email}</p>
                </td>
                <td className={styles.tableCell}>
                  <p
                    className={`${styles.role} ${
                      user.role === UserRole.ADMIN
                        ? styles.admin
                        : user.role === UserRole.USER
                        ? styles.user
                        : styles.pending
                    }`}
                  >
                    {user.role}
                  </p>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button onClick={() => handleUser(user)}>
                      <Eye />
                    </button>
                    <button>
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
