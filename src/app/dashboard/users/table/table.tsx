'use client'

import { UserProps } from '@/types/user'
import styles from './table.module.css'
import { Trash2, UserRoundPen, Eye } from 'lucide-react'
import { use } from 'react'
import { UserContext } from '@/providers/user'

interface TableProps {
  users: UserProps[]
}
export default function Table({ users }: TableProps) {
  const { setcurrentUser, setUserModalOpen, setOnEdition } = use(UserContext)

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
              <th className={styles.tableCell}>Name</th>
              <th className={styles.tableCell}>Email</th>
              <th className={styles.tableCell}>Role</th>
              <th className={styles.tableCell}>Actions</th>
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
                      user.role === 'admin'
                        ? styles.admin
                        : user.role === 'user'
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
                    <button>
                      <UserRoundPen
                        onClick={() => {
                          handleUser(user);
                          setOnEdition(false);
                        }}
                      />
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
