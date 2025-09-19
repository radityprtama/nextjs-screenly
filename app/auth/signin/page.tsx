"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { redirect: false, email, password, callbackUrl })
    setLoading(false)
    if (res?.error) {
      setError('Email atau password salah')
      return
    }
    router.push(callbackUrl)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[url('https://picsum.photos/seed/nonton/1200/800')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative w-full max-w-md bg-black/70 border border-gray-800 rounded-md p-6">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        {error && (
          <div className="mb-4 text-sm text-red-400">{error}</div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm mb-1 block">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm mb-1 block">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button disabled={loading} className="w-full bg-netflix-red hover:bg-netflix-red/90">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-sm text-gray-300 mt-4">
          Belum punya akun?{' '}
          <Link className="text-netflix-red hover:underline" href="/auth/signup">Daftar</Link>
        </p>
      </div>
    </div>
  )
}
