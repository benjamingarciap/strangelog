// /components/SessionWrapper.tsx
'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <SessionProvider>{children}</SessionProvider>
}
