import { RegisterForm } from '@/components/auth/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registro | ALIENTEKA',
  description: 'Únete a la comunidad de investigadores OVNI más grande del mundo',
}

export default function RegisterPage() {
  return <RegisterForm />
}
