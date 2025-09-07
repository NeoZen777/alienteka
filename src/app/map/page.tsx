import { Metadata } from 'next'
import MapClient from '@/components/maps/MapClient'

export const metadata: Metadata = {
  title: 'Mapa de Avistamientos | ALIENTEKA',
}

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 font-orbitron mb-6">🗺️ Mapa de Avistamientos</h1>
  <MapClient />
    </div>
  )
}
