import dynamic from 'next/dynamic'
import Map from './map'

export default function MapWrapper({ encounters }: { encounters: any[] }) {
  return <Map encounters={encounters} />
}
