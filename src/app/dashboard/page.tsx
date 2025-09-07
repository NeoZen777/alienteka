'use client'

import { useAuth } from '@/hooks/useAuth'
import { AlienLoader } from '@/components/alien-theme/loaders'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <AlienLoader size="lg" />
          <h2 className="text-2xl font-bold text-green-400 mt-6 font-orbitron">
            🛸 Cargando Panel de Control
          </h2>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black text-green-100 relative overflow-hidden">
      {/* Efecto de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-rain"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header del Dashboard */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-400 font-orbitron mb-2">
              🛸 Panel de Control ALIENTEKA
            </h1>
            <p className="text-green-300">
              Bienvenido, Agente {user.user_metadata?.username || user.email}
            </p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-green-500 text-green-400 hover:bg-green-500/20"
          >
            🚀 Cerrar Transmisión
          </Button>
        </div>

        {/* Información del Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-black/90 border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            <h3 className="text-xl font-bold text-green-400 mb-4">👤 Perfil de Agente</h3>
            <div className="space-y-2 text-green-300">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Verificado:</strong> {user.email_confirmed_at ? '✅ Sí' : '❌ No'}</p>
              <p><strong>Último acceso:</strong> {new Date(user.last_sign_in_at || '').toLocaleDateString()}</p>
            </div>
          </Card>

          <Card className="p-6 bg-black/90 border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            <h3 className="text-xl font-bold text-green-400 mb-4">📊 Estadísticas</h3>
            <div className="space-y-2 text-green-300">
              <p><strong>Artículos escritos:</strong> 0</p>
              <p><strong>Avistamientos reportados:</strong> 0</p>
              <p><strong>Comentarios:</strong> 0</p>
              <p><strong>Nivel de reputación:</strong> Novato</p>
            </div>
          </Card>

          <Card className="p-6 bg-black/90 border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            <h3 className="text-xl font-bold text-green-400 mb-4">🎯 Próximas Misiones</h3>
            <div className="space-y-2 text-green-300">
              <p>• Escribir primer artículo</p>
              <p>• Reportar avistamiento</p>
              <p>• Completar perfil</p>
              <p>• Unirse a la comunidad</p>
            </div>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            className="h-24 bg-green-600 hover:bg-green-700 text-black font-bold shadow-[0_0_20px_rgba(0,255,0,0.3)]"
            onClick={() => router.push('/articles/new')}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">📝</div>
              <div>Escribir Artículo</div>
            </div>
          </Button>

          <Button 
            className="h-24 bg-green-600 hover:bg-green-700 text-black font-bold shadow-[0_0_20px_rgba(0,255,0,0.3)]"
            onClick={() => router.push('/sightings/new')}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">🛸</div>
              <div>Reportar Avistamiento</div>
            </div>
          </Button>

          <Button 
            className="h-24 bg-green-600 hover:bg-green-700 text-black font-bold shadow-[0_0_20px_rgba(0,255,0,0.3)]"
            onClick={() => router.push('/map')}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">🗺️</div>
              <div>Explorar Mapa</div>
            </div>
          </Button>

          <Button 
            className="h-24 bg-green-600 hover:bg-green-700 text-black font-bold shadow-[0_0_20px_rgba(0,255,0,0.3)]"
            onClick={() => router.push('/profile/edit')}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">⚙️</div>
              <div>Editar Perfil</div>
            </div>
          </Button>
        </div>

        {/* Actividad Reciente */}
        <Card className="mt-8 p-6 bg-black/90 border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
          <h3 className="text-xl font-bold text-green-400 mb-4">📡 Actividad Reciente</h3>
          <div className="text-green-300">
            <p className="text-center py-8 text-green-500">
              🛸 No hay actividad reciente. ¡Comienza tu primera misión!
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
