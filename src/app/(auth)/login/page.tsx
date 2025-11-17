"use client"
import { useAuthStore } from "@/store/Auth"
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

function LoginPage() {
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
      setError("Please fill in all the fields")
      setIsLoading(false)
      return
    }

    setError("")
    setIsLoading(true)

    const loginResponse = await login(email as string, password as string)
    if (loginResponse.error) {
      setError(loginResponse.error!.message)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {error && <p className="text-sm text-destructive mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage