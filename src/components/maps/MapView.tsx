'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { demoMarkers } from '@/lib/data'

// Fix default icon path in Leaflet when using bundlers
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import marker from 'leaflet/dist/images/marker-icon.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'

type WithSrc = { src: string }
function hasSrc(v: unknown): v is WithSrc {
  return (
    typeof v === 'object' &&
    v !== null &&
    'src' in (v as { src?: unknown }) &&
    typeof (v as { src?: unknown }).src === 'string'
  )
}

function toUrl(v: unknown): string {
  if (typeof v === 'string') return v
  if (hasSrc(v)) return v.src
  return String(v)
}

const DefaultIcon = L.icon({
  iconUrl: toUrl(marker),
  iconRetinaUrl: toUrl(marker2x),
  shadowUrl: toUrl(shadow),
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

export default function MapView() {
  return (
    <div className="h-[70vh] w-full rounded-xl overflow-hidden border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
      <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {demoMarkers.map((m) => (
          <Marker key={m.id} position={m.position}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold text-green-400">{m.title}</div>
                <div className="text-green-300">{m.description}</div>
                <div className="text-green-500 text-xs mt-1">Credibilidad: {m.credibility}/10 • {m.verified ? 'Verificado' : 'No verificado'}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
