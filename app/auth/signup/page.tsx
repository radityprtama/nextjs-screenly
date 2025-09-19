"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Terjadi kesalahan')
      return
    }

    router.push('/auth/signin')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[url('https://picsum.photos/seed/daftar/1200/800')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative w-full max-w-md bg-black/70 border border-gray-800 rounded-md p-6">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

        {error && (
          <div className="mb-4 text-sm text-red-400">{error}</div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm mb-1 block">Nama</label>
            <Input
              type="text"
              placeholder="Nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <Button disabled={loading} className="w-full bg-netflix-red hover:bg-netflix-red/90">
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-sm text-gray-300 mt-4">
          Sudah punya akun?{' '}
          <Link className="text-netflix-red hover:underline" href="/auth/signin">Masuk</Link>
        </p>
      </div>
    </div>
  )
}
