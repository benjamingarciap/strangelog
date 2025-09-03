import { Encounter } from '../types/encounters'
export const dummyEncounters = [
  {
    id: 1,
    title: 'UFO over Madrid',
    content:
      'Saw a triangular UFO hovering above the city at 10 PM. No sound, just lights.',
    location: { lat: 40.4168, lng: -3.7038 },
    category: 'UFO',
    date: '2025-09-03',
    media: [
      'https://images.unsplash.com/photo-1612512836264-5e58fab88bf0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 2,
    title: 'Haunted House in Pozuelo',
    content: 'Strange noises and cold spots in an old abandoned mansion.',
    location: { lat: 40.4412, lng: -3.7871 },
    category: 'Haunting',
    date: '2025-08-21',
    media: [
      'https://images.unsplash.com/photo-1612512836264-5e58fab88bf0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 3,
    title: 'Bigfoot Sighting in the Forest',
    content: 'Large humanoid figure crossing the trail. Left footprints.',
    location: { lat: 40.7936, lng: -4.0039 }, // Sierra de Guadarrama approximate
    category: 'Cryptid',
    date: '2025-07-15',
    media: [
      'https://images.unsplash.com/photo-1612512836264-5e58fab88bf0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 4,
    title: 'Poltergeist Activity in My Apartment',
    content: 'Objects moving on their own. Lights flickering randomly.',
    location: { lat: 40.4168, lng: -3.7038 },
    category: 'Poltergeist',
    date: '2025-06-30',
    media: [
      'https://images.unsplash.com/photo-1612512836264-5e58fab88bf0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 5,
    title: 'Strange Lights in the Sky',
    content: 'Multiple orbs moving erratically above the mountains.',
    location: { lat: 40.75, lng: -3.75 }, // Sierra de Madrid approximate
    category: 'UFO',
    date: '2025-09-01',
    media: [
      'https://images.unsplash.com/photo-1612512836264-5e58fab88bf0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
]
