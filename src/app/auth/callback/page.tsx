"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallbackPage() {
	const router = useRouter()
	const params = useSearchParams()

	useEffect(() => {
		const run = async () => {
			const code = params.get('code')
			if (!code) {
				router.replace('/auth/login?error=missing_code')
				return
			}

			const supabase = createClientComponentClient()
			try {
				await supabase.auth.exchangeCodeForSession(code)
				router.replace('/dashboard')
			} catch (e) {
				router.replace('/auth/login?error=auth_callback_error')
			}
		}
		run()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="min-h-[50vh] flex items-center justify-center">
			<div className="text-center">
				<p className="text-alien-primary">Procesando autenticación...</p>
				<p className="text-sm text-gray-400 mt-2">Por favor espera un momento.</p>
			</div>
		</div>
	)
}
