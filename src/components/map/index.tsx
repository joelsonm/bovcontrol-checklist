import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import Map from './map'

const MapSSR = dynamic(() => import('./map'), {
  ssr: false,
}) as typeof Map

export default MapSSR
