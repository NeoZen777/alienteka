'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    if (password.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres')
      return
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setMessage('✅ Contraseña actualizada. Redirigiendo al login...')
      setTimeout(() => router.replace('/auth/login'), 1200)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'No se pudo actualizar la contraseña'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden py-8">
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-rain"></div>
      </div>

      <Card className="w-full max-w-md p-8 bg-black/90 border-2 border-green-500 shadow-[0_0_30px_rgba(0,255,0,0.3)] backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-green-400 font-orbitron mb-4">Restablecer contraseña</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-400 mb-2">Nueva contraseña</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="bg-black/50 border-green-500 text-green-100 placeholder-green-600 focus:ring-green-400 focus:border-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-400 mb-2">Confirmar contraseña</label>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repite tu contraseña"
              className="bg-black/50 border-green-500 text-green-100 placeholder-green-600 focus:ring-green-400 focus:border-green-400"
            />
          </div>
          {error && (
            <div className="p-3 rounded-lg bg-red-900/50 border border-red-500 text-red-300 text-sm">⚠️ {error}</div>
          )}
          {message && (
            <div className="p-3 rounded-lg bg-green-900/50 border border-green-500 text-green-300 text-sm">{message}</div>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-4 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
          >
            {isLoading ? 'Actualizando…' : 'Actualizar contraseña'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
