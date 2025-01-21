'use client'

import { ChangeEvent, use } from 'react'
import AddEditModal from '../../components/modal'
import { UserContext } from '@/providers/user'
import styles from './modal.module.css'
import Dropdown from '../../components/dropDown'

const UserModal = () => {
  const {
    isUserModalOpen,
    currentUser,
    newUser,
    onEdition,
    setUserModalOpen,
    setcurrentUser,
    setOnEdition
  } = use(UserContext)
  const handleClose = () => {
    setUserModalOpen(false)
    setcurrentUser(newUser)
    setOnEdition(true)
  }
  const handleSubmit = () => {
    console.log(currentUser)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setcurrentUser(prev => ({ ...prev, [name]: value }))
  }
  const handleEditi = () => {
    setOnEdition(!onEdition)
  }
  return (
    <AddEditModal
      isOpen={isUserModalOpen}
      modalTitle="Usuario"
      onCancel={handleClose}
      onSave={handleSubmit}
      buttons={!onEdition}
      enableEdition={handleEditi}
    >
      <section className={styles.formulary}>
        <input
          type="name"
          required
          name="name"
          disabled={onEdition}
          value={currentUser.name}
          placeholder="Digite seu email..."
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="email"
          required
          disabled={onEdition}
          name="email"
          value={currentUser.email}
          placeholder="Digite seu email..."
          className={styles.input}
          onChange={handleChange}
        />

        <Dropdown
          disabled={onEdition}
          defaultValue={currentUser.role}
          name="role"
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' }
          ]}
          onChange={handleChange}
        />
      </section>
    </AddEditModal>
  )
}
export default UserModal
