import { LoginForm } from '@/components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión | ALIENTEKA',
  description: 'Accede a la enciclopedia OVNI más completa del universo',
}

export default function LoginPage() {
  return <LoginForm />
}
