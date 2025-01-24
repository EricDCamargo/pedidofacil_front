'use client'

import styles from './styles.module.css'
import { UserRoundPlus } from 'lucide-react'
import { UserProps } from '@/types/user'
import { UserContext } from '@/providers/user'
import { useContext } from 'react'
import UserModal from '../usermodal/modal'
import Table from '../table/table'

interface UsersPageProps {
  users: UserProps[] | []
}

export default function UsersPage({ users }: UsersPageProps) {
  const { setUserModalOpen } = useContext(UserContext)

  return (
    <div className={styles.container}>
      <div className={styles.userHeader}>
        <h1>Usuários</h1>
        <button
          className={styles.addUser}
          onClick={() => setUserModalOpen(true)}
        >
          <p> Adicionar usuario</p>
          <UserRoundPlus />
        </button>
      </div>
      <Table users={users} />
      <UserModal />
    </div>
  )
}
