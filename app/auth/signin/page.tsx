'use client'
import React from 'react'
import { LoginForm } from '@/components/login-form'
export default function SignInPage(): React.JSX.Element {
  return (
    <div className="max-h-full flex flex-col justify-center items-center w-full overflow-y-auto">
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
