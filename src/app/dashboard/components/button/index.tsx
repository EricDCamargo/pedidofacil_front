'use client'

import styles from './styles.module.css'
import { useFormStatus } from 'react-dom'

interface Props {
  name: string
  onClick: VoidFunction
}

export function Button({ name, onClick }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={styles.button}
      onClick={onClick}
    >
      {pending ? 'Carregando...' : name}
    </button>
  )
}
