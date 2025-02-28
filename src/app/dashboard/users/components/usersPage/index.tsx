'use client'

import styles from './styles.module.css'
import { Eye, Trash2, UserRoundPlus } from 'lucide-react'
import { UserProps, UserRole } from '@/types/user.type'
import { newUser, UserContext } from '@/contexts/user'
import { useContext } from 'react'
import { serviceConsumer } from '@/services/service.consumer'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { TableColumn } from '@/types/dataTable.type'
import { getLabel } from '@/utils/recordStatus'
import DataTable from '@/app/dashboard/_components/dataTable/dataTable'
import ConfirmModal from '@/app/dashboard/_components/modals/confirm'
import UserModal from '../userModal/modal'
import PageLayout from '@/app/dashboard/_components/PageLayout/pageLayout'

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
      const res = await serviceConsumer().executeDelete('/users', {
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

  const handleViewUser = (user: UserProps) => {
    setcurrentUser(user)
    setUserModalOpen(true)
  }
  const handleDeleteUser = (user: UserProps) => {
    setcurrentUser(user)
    setConfirmModalOpen(true)
  }

  const columns: TableColumn<UserProps>[] = [
    { name: 'Nome', selector: row => row.name },
    { name: 'Email', selector: row => row.email },
    {
      name: 'Permissão',
      selector: row => (
        <p
          className={`${styles.role} ${
            row.role === UserRole.ADMIN
              ? styles.admin
              : row.role === UserRole.USER && styles.user
          }`}
        >
          {getLabel(row.role)}
        </p>
      )
    },
    {
      name: 'Ações',
      cell: row => (
        <div className={'actions'}>
          <button onClick={() => handleViewUser(row)}>
            <Eye />
          </button>
          <button onClick={() => handleDeleteUser(row)}>
            <Trash2 />
          </button>
        </div>
      )
    }
  ]

  return (
    <PageLayout
      headerProps={{
        title: 'Usuários',
        button: {
          buttonLabel: 'Adicionar usuário',
          buttonIcon: <UserRoundPlus />,
          onButtonClick: handleAddUser
        }
      }}
    >
      <DataTable columns={columns} data={users} />
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
      <UserModal />
    </PageLayout>
  )
}
