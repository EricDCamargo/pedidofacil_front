import { ChangeEvent } from 'react'

const handleChange = <T extends Record<string, any>>(
  setValues: React.Dispatch<React.SetStateAction<T>>,
  e: ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target
  setValues(prev => ({ ...prev, [name]: value }))
}

export { handleChange }
