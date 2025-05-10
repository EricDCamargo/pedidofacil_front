import { Suspense } from 'react'
import { Header } from './_components/header'
import { PagesMenu } from './_components/menu'
import styles from './layout.module.css'
import ToastHandler from '@/lib/toastHandler'
import Loading from './_components/loading/loading'
import DashBoardProvider from './provider'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.grid}>
      <DashBoardProvider>
        <Header />
        <div className={styles.content}>
          <PagesMenu />
          <Suspense fallback={<Loading />}>
            {children}
            <ToastHandler />
          </Suspense>
        </div>
      </DashBoardProvider>
    </main>
  )
}
export const dynamic = 'force-dynamic'
