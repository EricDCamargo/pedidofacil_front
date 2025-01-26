'use client'

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'
import { toast } from 'sonner'
import { UserProps, UserRole } from '@/types/user'
import { serviceConsumer } from '@/services/service.consumer'
import { getCookieClient } from '@/lib/cookieClient'

type UserContextData = {
  newUser: UserProps
  loggedUser: UserProps | undefined
  currentUser: UserProps
  isUserModalOpen: boolean
  isConfirmModalOpen: boolean
  onEdition: boolean
  setOnEdition: Dispatch<SetStateAction<boolean>>
  setLoggedUser: Dispatch<SetStateAction<UserProps | undefined>>
  setcurrentUser: Dispatch<SetStateAction<UserProps>>
  setUserModalOpen: Dispatch<SetStateAction<boolean>>
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>
  verifyUser: () => Promise<void>
}

type UserProviderProps = {
  children: ReactNode
  initialUser?: UserProps | null
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

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [onEdition, setOnEdition] = useState<boolean>(true)

  const [loggedUser, setLoggedUser] = useState<UserProps | undefined>(
    initialUser || undefined
  )
  const [currentUser, setcurrentUser] = useState<UserProps>(newUser)

  async function verifyUser(): Promise<void> {
    const token = await getCookieClient()
    try {
      const res = await serviceConsumer(token).executeGet('/me')
      setLoggedUser(res.data)
    } catch (err) {
      toast.error('Você precisa estar logado para acessar essa página.')
      setLoggedUser(undefined)
    }
  }
  useEffect(() => {
    verifyUser()
  }, [])
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
