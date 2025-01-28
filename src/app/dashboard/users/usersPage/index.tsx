'use client'

import styles from './styles.module.css'
import { UserRoundPlus } from 'lucide-react'
import { UserProps } from '@/types/user'
import { newUser, UserContext } from '@/providers/user'
import { useContext } from 'react'
import UserModal from '../usermodal/modal'
import Table from '../table/table'
import ConfirmModal from '../../components/modals/confirm'
import { serviceConsumer } from '@/services/service.consumer'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface UsersPageProps {
  users: UserProps[] | []
}

export default function UsersPage({ users }: UsersPageProps) {
  const router = useRouter()
  const {
    setUserModalOpen,
    isConfirmModalOpen,
    setConfirmModalOpen,
    setOnEdition,
    currentUser,
    setcurrentUser
  } = useContext(UserContext)

  const handleDelete = async () => {
    if (!currentUser.id) {
      return
    }
    try {
      const res = await serviceConsumer('').executeDelete('/users', {
        user_id: currentUser.id
      })
      if (res.isOk) {
        toast.success(res.message)
        setConfirmModalOpen(false)
        setcurrentUser(newUser)
        router.refresh()
      }
    } catch (err) {
      console.log(err)
      toast.error('Erro ao remover usuario!')
    }
  }

  const handleCancel = () => {
    setConfirmModalOpen(false)
    setcurrentUser(newUser)
  }
  const handleAddUser = () => {
    setUserModalOpen(true)
    setOnEdition(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.userHeader}>
        <h1>Usuários</h1>
        <button className={styles.addUser} onClick={handleAddUser}>
          <p> Adicionar usuario</p>
          <UserRoundPlus />
        </button>
      </div>
      <Table users={users} />
      <UserModal />
      <ConfirmModal
        modalText={{
          title: 'Remover Usuario',
          message: (
            <>
              Tem certeza quer remover usuario? <br />
              <br />
              {
                <strong>
                  {currentUser.name} <br />
                  {currentUser.email}
                </strong>
              }
            </>
          )
        }}
        isOpen={isConfirmModalOpen}
        onCancel={handleCancel}
        onConfirm={handleDelete}
      />
    </div>
  )
}
