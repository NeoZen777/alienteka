'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden py-8">
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-rain"></div>
      </div>

      <Card className="w-full max-w-md p-8 bg-black/90 border-2 border-green-500 shadow-[0_0_30px_rgba(0,255,0,0.3)] backdrop-blur-sm text-center">
        <div className="text-6xl mb-4">📫</div>
        <h1 className="text-2xl font-bold text-green-400 font-orbitron mb-2">Verifica tu email</h1>
        <p className="text-green-300 mb-6">
          Te enviamos un enlace de verificación. Abre tu correo y confirma para activar tu cuenta.
        </p>

        <div className="space-y-3">
          <p className="text-green-500 text-sm">Si no ves el email, revisa la carpeta de spam.</p>
          <Link href="/auth/login">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-black font-bold">
              Ir al Login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
