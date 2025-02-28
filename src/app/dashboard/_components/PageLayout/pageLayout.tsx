'use client'

import React, { ReactNode } from 'react'
import styles from './pageLayout.module.css'

interface ContainerProps {
  children: ReactNode[]
}

function Container({ children }: ContainerProps) {
  return <section className={styles.container}>{children}</section>
}

interface PageLayoutHeaderProps {
  title: string
  button?: {
    buttonLabel: string
    buttonIcon?: ReactNode
    onButtonClick: () => void
  }
  children?: ReactNode
}

function PageLayoutHeader({ title, button, children }: PageLayoutHeaderProps) {
  return (
    <header className={styles.headerContainer}>
      <h1>{title}</h1>
      {children}
      {button && (
        <button className={styles.actionButton} onClick={button.onButtonClick}>
          {button.buttonLabel}
          {button.buttonIcon && (
            <span className={styles.buttonIcon}>{button.buttonIcon}</span>
          )}
        </button>
      )}
    </header>
  )
}

interface PageLayoutProps {
  headerProps: PageLayoutHeaderProps
  children: ReactNode
}

export default function PageLayout({ headerProps, children }: PageLayoutProps) {
  return (
    <Container>
      <PageLayoutHeader {...headerProps} />
      {children}
    </Container>
  )
}
