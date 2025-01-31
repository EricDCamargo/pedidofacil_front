'use client'

import { ChangeEvent, useContext, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { ArrowBigLeft, Pencil, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { toast } from 'sonner'
import { ProductContext } from '@/providers/product'
import { CategoryProps } from '@/types/category.type'
import Dropdown from '@/app/dashboard/components/dropDown'
import { formatCurrency } from '@/utils'

interface Props {
  categories: CategoryProps[]
  isOpen: boolean
}

export function AddProduct({ isOpen, categories }: Props) {
  const {
    setProductModalOpen,
    setCurrentProduct,
    setOnEdition,
    createProcuct,
    updateProcuct,
    newProduct,
    currentProduct,
    onEdition
  } = useContext(ProductContext)
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState(currentProduct.banner)
  const [price, setPrice] = useState<string>('')

  useEffect(() => {
    setPreviewImage(currentProduct.banner)
    setPrice(currentProduct.price.toString())
  }, [currentProduct])

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/\D/g, '')

    if (rawValue === '') {
      setPrice('0')
      return
    }
    const paddedValue = rawValue.padStart(3, '0')
    const floatValue = paddedValue.slice(0, -2) + '.' + paddedValue.slice(-2)

    setPrice(floatValue)
  }

  async function handleSubmit(formData: FormData) {
    const name = formData.get('name')
    const category_id = formData.get('category')
    const description = formData.get('description')

    if (!name || !category_id || !price || !description || !previewImage) {
      toast.warning('Preencha todos os campos!')
      return
    }

    const data = new FormData()

    data.append('name', name)
    data.append('price', price)
    data.append('description', description)
    data.append('category_id', category_id)
    data.append('file', image!)

    if (currentProduct.id) {
      await updateProcuct(data)
    } else {
      await createProcuct(data)
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        toast.warning('Formato não permitido!')
        return
      }

      setImage(image)
      setPreviewImage(URL.createObjectURL(image))
    }
  }

  const handlePreviousPage = () => {
    setProductModalOpen(false)
    setCurrentProduct(newProduct)
    setPreviewImage('')
    setPrice('')
  }

  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.id
  }))
  if (isOpen) {
    return (
      <main className={styles.backgroundModal}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              <button onClick={handlePreviousPage}>
                <ArrowBigLeft size={40} />
              </button>

              <h1>
                {currentProduct.id
                  ? `Editar produto ${currentProduct.name}`
                  : 'Novo produto'}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <h2>Editar</h2>
              <button onClick={() => setOnEdition(!onEdition)}>
                <Pencil />
              </button>
            </div>
          </div>
          <form className={styles.form} action={handleSubmit}>
            <label
              className={`${styles.labelImage}  ${
                previewImage ? styles.previewActive : ''
              }`}
            >
              <span className={`${!onEdition && styles.spanIcon}`}>
                <UploadCloud size={30} />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                required={!previewImage && true}
                disabled={onEdition}
                onChange={handleFile}
              />

              {previewImage && (
                <Image
                  alt="Imagem de preview"
                  src={previewImage}
                  className={styles.preview}
                  fill={true}
                  quality={100}
                  priority={true}
                />
              )}
            </label>
            <Dropdown
              disabled={onEdition}
              defaultValue={currentProduct.category.name}
              name="category"
              options={categoryOptions}
              width="100%"
            />

            <input
              type="text"
              name="name"
              disabled={onEdition}
              defaultValue={currentProduct.name}
              placeholder="Digite o nome do produto..."
              required
              className={styles.input}
            />

            <input
              type="text"
              name="price"
              value={formatCurrency(price)}
              onChange={handlePriceChange}
              disabled={onEdition}
              required
              className={styles.input}
              placeholder="Preço do produto..."
            />

            <textarea
              className={styles.input}
              placeholder="Digite a descrição do produto..."
              disabled={onEdition}
              required
              defaultValue={currentProduct.description}
              name="description"
            />

            <Button name="Cadastrar produto" type="submit" />
          </form>
        </div>
      </main>
    )
  }
  return null
}
