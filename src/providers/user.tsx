'use client'

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UserProps } from '@/types/user'

type UserContextData = {
  newUser: UserProps
  loggedUser: UserProps | undefined
  currentUser: UserProps
  isUserModalOpen: boolean
  onEdition: boolean
  setOnEdition: Dispatch<SetStateAction<boolean>>
  setLoggedUser: Dispatch<SetStateAction<UserProps | undefined>>
  setcurrentUser: Dispatch<SetStateAction<UserProps>>
  setUserModalOpen: Dispatch<SetStateAction<boolean>>
}

type UserProviderProps = {
  children: ReactNode
}
const newUser: UserProps = {
  id: '',
  name: '',
  email: '',
  role: '',
  created_at: '',
  updated_at: ''
}
export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: UserProviderProps) {
  const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false)
  const [onEdition, setOnEdition] = useState<boolean>(true)
  const [loggedUser, setLoggedUser] = useState<UserProps>()
  const [currentUser, setcurrentUser] = useState<UserProps>(newUser)

  const router = useRouter()

  return (
    <UserContext.Provider
      value={{
        newUser,
        currentUser,
        loggedUser,
        isUserModalOpen,
        onEdition,
        setOnEdition,
        setUserModalOpen,
        setcurrentUser,
        setLoggedUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
