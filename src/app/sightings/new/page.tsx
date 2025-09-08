"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function NewSightingPage() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [dateOccurred, setDateOccurred] = useState('')
  const [sightingType, setSightingType] = useState('LIGHTS')
  const [description, setDescription] = useState('')
  const [credibility, setCredibility] = useState(5)
  const [verified, setVerified] = useState(false)
  const [saving, setSaving] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/sightings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        dateOccurred,
        sightingType,
        description,
        credibility,
        verified,
      }),
    })
    setSaving(false)
    if (res.ok) {
      router.replace('/map')
    } else {
      const data = await res.json().catch(() => ({}))
      alert(data.error || 'Error al crear avistamiento')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 font-orbitron mb-6">🛸 Nuevo Avistamiento</h1>
      <Card className="p-6 space-y-4 bg-black/80 border-2 border-green-600">
        <form onSubmit={submit} className="space-y-4">
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ubicación" className="w-full p-2 bg-black border border-green-700 rounded" required />
          <div className="grid grid-cols-2 gap-4">
            <input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitud" className="w-full p-2 bg-black border border-green-700 rounded" required />
            <input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitud" className="w-full p-2 bg-black border border-green-700 rounded" required />
          </div>
          <input type="datetime-local" value={dateOccurred} onChange={(e) => setDateOccurred(e.target.value)} className="w-full p-2 bg-black border border-green-700 rounded" required />
          <select value={sightingType} onChange={(e) => setSightingType(e.target.value)} className="w-full p-2 bg-black border border-green-700 rounded">
            {['LIGHTS','CRAFT','HUMANOID','TRIANGLE','DISK','CIGAR','SPHERE','OTHER'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Descripción" className="w-full p-2 bg-black border border-green-700 rounded" />
          <div className="grid grid-cols-2 gap-4 items-center">
            <input type="number" min={1} max={10} value={credibility} onChange={(e) => setCredibility(parseInt(e.target.value || '5'))} className="w-full p-2 bg-black border border-green-700 rounded" />
            <label className="flex items-center gap-2 text-green-300"><input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} /> Verificado</label>
          </div>
          <Button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700 text-black">
            {saving ? 'Guardando...' : 'Crear avistamiento'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
