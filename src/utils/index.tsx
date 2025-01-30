import { ChangeEvent } from 'react'

const handleChange = <T extends Record<string, any>>(
  setValues: React.Dispatch<React.SetStateAction<T>>,
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target
  const processedValue = type === 'number' ? value.replace(/\D/g, '') : value

  setValues(prev => ({
    ...prev,
    [name]: processedValue
  }))
}

const formatPrice = (value: FormDataEntryValue | null | number) => {
  if (!value) return ''
  const num = Number(value.toString().replace(/\D/g, '')) / 100
  const retorno = `R$ ${num.toFixed(2).replace('.', ',')}`

  return retorno
}

const formatCurrency = (value: string) => {
  if (!value) return ''
  const rawValue = value.replace(/\D/g, '')
  const floatValue = parseFloat(rawValue) / 100
  return floatValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export { handleChange, formatPrice, formatCurrency }
