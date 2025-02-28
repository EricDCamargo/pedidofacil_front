'use client'

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import { UserProps, UserRole } from '@/types/user.type'
import { getUserServer } from '@/services/retriveSSRData/retriveUserData'

type UserContextData = {
  newUser: UserProps
  loggedUser: UserProps | null
  currentUser: UserProps
  isUserModalOpen: boolean
  isConfirmModalOpen: boolean
  onEdition: boolean
  setOnEdition: Dispatch<SetStateAction<boolean>>
  setLoggedUser: Dispatch<SetStateAction<UserProps | null>>
  setcurrentUser: Dispatch<SetStateAction<UserProps>>
  setUserModalOpen: Dispatch<SetStateAction<boolean>>
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>
  verifyUser: () => Promise<void>
}

type UserProviderProps = {
  children: ReactNode
  initializeUser: UserProps | null
}
export const newUser: UserProps = {
  id: '',
  name: '',
  email: '',
  role: UserRole.USER,
  password: '',
  created_at: '',
  updated_at: ''
}
export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children, initializeUser }: UserProviderProps) {
  const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [onEdition, setOnEdition] = useState<boolean>(true)

  const [loggedUser, setLoggedUser] = useState<UserProps | null>(
    initializeUser || null
  )
  const [currentUser, setcurrentUser] = useState<UserProps>(newUser)

  async function verifyUser(): Promise<void> {
    const user = await getUserServer()
    setLoggedUser(user)
  }

  return (
    <UserContext.Provider
      value={{
        newUser,
        currentUser,
        loggedUser,
        isUserModalOpen,
        onEdition,
        isConfirmModalOpen,
        setConfirmModalOpen,
        setOnEdition,
        setUserModalOpen,
        setcurrentUser,
        setLoggedUser,
        verifyUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
