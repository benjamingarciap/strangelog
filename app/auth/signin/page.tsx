'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function SignInPage(): React.JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/', // redirect after login
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded">
        <h1 className="text-lg font-semibold">Sign in</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          id="email"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          id="password"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Sign In
        </button>
      </form>
    </div>
  )
}
