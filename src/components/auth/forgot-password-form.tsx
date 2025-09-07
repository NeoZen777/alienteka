'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AlienLoader } from '@/components/alien-theme/loaders'
import Link from 'next/link'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    const result = await resetPassword(email)
    
    if (result.success) {
      setIsSuccess(true)
      setMessage('✅ Hemos enviado un enlace de restablecimiento a tu email cósmico')
    } else {
      setMessage(`❌ ${result.error}`)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Efecto de lluvia de matriz de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-rain"></div>
      </div>

      <Card className="w-full max-w-md p-8 bg-black/90 border-2 border-green-500 shadow-[0_0_30px_rgba(0,255,0,0.3)] backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-400 font-orbitron mb-2">
            🔐 Recuperar Acceso
          </h1>
          <p className="text-green-300 text-sm">
            Restablece tu código de acceso galáctico
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-400 mb-2">
                Email Cósmico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contacto@alien.galaxy"
                required
                disabled={isLoading}
                className="bg-black/50 border-green-500 text-green-100 placeholder-green-600 focus:ring-green-400 focus:border-green-400"
              />
            </div>

            {message && (
              <div className={`p-3 rounded-lg border text-sm ${
                isSuccess 
                  ? 'bg-green-900/50 border-green-500 text-green-300'
                  : 'bg-red-900/50 border-red-500 text-red-300'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-4 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <AlienLoader size="sm" />
                  <span className="ml-2">Enviando...</span>
                </div>
              ) : (
                '📡 Enviar Código de Restablecimiento'
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">📧</div>
            <div className="space-y-2">
              <p className="text-green-300">
                ✅ <strong>Mensaje enviado exitosamente</strong>
              </p>
              <p className="text-green-400 text-sm">
                Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu código de acceso.
              </p>
              <p className="text-green-500 text-xs">
                Si no ves el email, revisa tu carpeta de spam o correo no deseado.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-green-400 text-sm">
            ¿Recordaste tu código?{' '}
            <Link href="/auth/login" className="text-green-300 hover:text-green-100 underline font-semibold">
              Volver al Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
