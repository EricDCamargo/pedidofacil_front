'use client'

import { ChangeEvent, useContext, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { ArrowBigLeft, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ProductContext } from '@/providers/product'
import { CategoryProps } from '@/types/category.type'
import { serviceConsumer } from '@/services/service.consumer'
import { StatusCodes } from 'http-status-codes'
import Dropdown from '@/app/dashboard/components/dropDown'
import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/api'

interface Props {
  categories: CategoryProps[]
  isOpen: boolean
}

export function AddProduct({ isOpen, categories }: Props) {
  const {
    setProductModalOpen,
    setCurrentProduct,
    setOnEdition,
    newProduct,
    currentProduct,
    onEdition
  } = useContext(ProductContext)
  const router = useRouter()
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState(currentProduct.banner)

  useEffect(() => {
    setPreviewImage(currentProduct.banner)
  }, [currentProduct])

  async function handleSubmit(formData: FormData) {
    const name = formData.get('name')
    const price = formData.get('price')
    const category_id = formData.get('category')
    const description = formData.get('description')

    if (!name || !category_id || !price || !description || !image) {
      toast.warning('Preencha todos os campos!')
      return
    }
    const getFormData = (): FormData => {
      const data = new FormData()

      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', category_id)
      data.append('file', image)

      return data
    }

    const createProcuct = async () => {
      try {
        const data = new FormData()

        data.append('name', name)
        data.append('price', price)
        data.append('description', description)
        data.append('category_id', category_id)
        data.append('file', image)

        const res = await serviceConsumer('').executePost(
          '/product',
          getFormData()
        )
        if (res.isOk && res.status === StatusCodes.CREATED) {
          toast.success(res.message)
          setProductModalOpen(false)
          setCurrentProduct(newProduct)
          router.refresh()
        } else {
          toast.error(res.message)
          setOnEdition(true)
        }
      } catch (err) {
        console.error(err)
        toast.error('Erro ao cadastrar produto!')
        setOnEdition(true)
      }
    }
    const updateProcuct = async () => {
      try {
        const res = await serviceConsumer('').executePut(
          '/product',
          { product_id: currentProduct.id },

          getFormData()
        )
        if (res.isOk && res.status === StatusCodes.OK) {
          toast.success(res.message)
          setProductModalOpen(false)
          setCurrentProduct(newProduct)
          router.refresh()
        } else {
          toast.error(res.message)
          setOnEdition(true)
        }
      } catch (err) {
        console.error(err)
        toast.error('Erro ao editar produto!')
        setOnEdition(true)
      }
    }

    // DETERMINATE FORM ACTION
    if (currentProduct.id) {
      await updateProcuct()
    } else {
      await createProcuct()
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
            <button onClick={handlePreviousPage}>
              <ArrowBigLeft size={40} />
            </button>

            <h1>
              {currentProduct.id
                ? `Editar produto ${currentProduct.name}`
                : 'Novo produto'}
            </h1>
          </div>
          <form className={styles.form} action={handleSubmit}>
            <label className={styles.labelImage}>
              <span>
                <UploadCloud size={30} color="#FFF" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                required
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
              defaultValue={currentProduct.category.name}
              name="category"
              options={categoryOptions}
              width="100%"
            />

            <input
              type="text"
              name="name"
              defaultValue={currentProduct.name}
              placeholder="Digite o nome do produto..."
              required
              className={styles.input}
            />

            <input
              type="number"
              name="price"
              defaultValue={currentProduct.price}
              placeholder="Preço do produto..."
              required
              className={styles.input}
            />

            <textarea
              className={styles.input}
              placeholder="Digite a descrição do produto..."
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
