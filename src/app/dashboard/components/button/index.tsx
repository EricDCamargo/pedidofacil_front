'use client'

import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'
import { useFormStatus } from 'react-dom'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset' | undefined
}

export function Button({ name, onClick, type }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type={type}
      disabled={pending}
      className={styles.button}
      onClick={onClick}
    >
      {pending ? 'Carregando...' : name}
    </button>
  )
}
