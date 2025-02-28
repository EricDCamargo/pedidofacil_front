import { Suspense } from 'react'
import { Header } from './_components/header'
import { PagesMenu } from './_components/menu'
import styles from './layout.module.css'
import AppProvider from './provider'
import ToastHandler from '@/lib/toastHandler'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.grid}>
      <AppProvider>
        <Header />
        <div className={styles.content}>
          <PagesMenu />
          <Suspense>
            <ToastHandler />
          </Suspense>
          {children}
        </div>
      </AppProvider>
    </main>
  )
}
export const dynamic = 'force-dynamic'
