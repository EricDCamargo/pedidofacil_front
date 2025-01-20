import styles from './table.module.css'
import { Trash2, UserRoundPen, Eye } from 'lucide-react'

interface UsePros {
  id: string
  name: string
  email: string
  role: string
  created_at: string
  updated_at: string
}
export default function Table() {
  const packageData: UsePros[] = [
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
    },
    {
      id: '2',
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
    },
    {
      id: '2',
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
    },
    {
      id: '2',
      name: 'Premium',
      email: 'john.doe@example.com',
      role: 'user',
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
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCell}>Name</th>
              <th className={styles.tableCell}>Email</th>
              <th className={styles.tableCell}>Role</th>
              <th className={styles.tableCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <p>{packageItem.name}</p>
                </td>
                <td className={styles.tableCell}>
                  <p>{packageItem.email}</p>
                </td>
                <td className={styles.tableCell}>
                  <p
                    className={`${styles.role} ${
                      packageItem.role === 'admin'
                        ? styles.admin
                        : packageItem.role === 'user'
                        ? styles.user
                        : styles.pending
                    }`}
                  >
                    {packageItem.role}
                  </p>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button>
                      <Eye />
                    </button>
                    <button>
                      <Trash2 />
                    </button>
                    <button>
                      <UserRoundPen />
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
