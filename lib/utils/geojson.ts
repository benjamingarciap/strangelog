import { EncounterCategory } from '../../generated/prisma'
import { Confidence, UIEnrichedEncounter } from '../../types/encounters'
import { Feature, Point } from 'geojson'

export function toGeoJSON(encounters: UIEnrichedEncounter[]): Feature<
  Point,
  {
    id: string | number
    title: string
    category: EncounterCategory[]
    confidences?: Confidence[]
    media?: string[]
    content: string
    date: Date
  }
>[] {
  return encounters.map((e) => ({
    type: 'Feature',
    properties: {
      id: e.id,
      title: e.title,
      category: e.category,
      confidences: e.confidences,
      media: e.media,
      content: e.content,
      date: e.date,
    },
    geometry: {
      type: 'Point',
      coordinates: [e.location.lng, e.location.lat],
    },
  }))
}
