import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recuperar Contraseña | ALIENTEKA',
  description: 'Restablece tu código de acceso a ALIENTEKA',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
