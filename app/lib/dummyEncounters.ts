import { Encounter } from '../types/encounters'

export const dummyEncounters: Encounter[] = [
  {
    id: 1,
    title: 'UFO over Madrid',
    content: `I was walking home from work around 10 PM when I noticed a triangular formation of lights in the sky. At first, I thought it was a plane, but there was no sound. The lights hovered silently for several minutes, then suddenly accelerated and vanished behind the city skyline. The shape was distinct, almost like a stealth aircraft, but with no visible engines. I managed to take a few photos with my phone, but the object moved too quickly for a clear shot. My heart was racing; it felt like something truly unexplainable was happening right above Madrid.`,
    location: { lat: 40.4168, lng: -3.3038 },
    evidence: ['Visual', 'Photo/Video — EO/IR'],
    category: 'UAP — Structured Craft: Triangle',
    date: '2025-09-03',
    media: [
      'https://images.unsplash.com/photo-1612512836264-5e58fab88bf0?q=80&w=1074&auto=format&fit=crop',
    ],
    likes: 12,
    dislikes: 1,
    comments: [
      {
        id: 1,
        authorId: 2,
        content: 'Wow, incredible sighting!',
        date: '2025-09-03',
      },
      {
        id: 2,
        authorId: 1,
        content: 'Those lights are definitely unusual.',
        date: '2025-09-04',
      },
    ],
    creatorId: 1,
  },
  {
    id: 2,
    title: 'Luminous Orbs in Pozuelo',
    content: `Late in the evening, I went out to get some fresh air and noticed several bright orbs moving erratically over my neighborhood. They were glowing, spherical, and seemed to dance in patterns that were impossible for conventional drones or aircraft. Sometimes they would disappear and reappear a few meters away. I grabbed my camera and filmed them for a few minutes. Later I checked local radar reports and there were unexplained readings in the same area at the same time. It was a surreal experience—almost magical, but completely unexplainable.`,
    location: { lat: 40.4412, lng: -3.7871 },
    evidence: ['Visual', 'Radar'],
    category: 'UAP — Luminous/Orbs',
    date: '2025-08-21',
    media: [
      'https://images.unsplash.com/photo-1607337202714-a88f7abbdee7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    likes: 8,
    dislikes: 0,
    comments: [
      {
        id: 3,
        authorId: 1,
        content: 'These orbs remind me of recent government footage.',
        date: '2025-08-22',
      },
    ],
    creatorId: 1,
  },
  {
    id: 3,
    title: 'Close Encounter in Sierra de Guadarrama',
    content: `While hiking in the mountains, I saw a disc-shaped object hovering above the tree line. It was low enough that I could clearly see its metallic surface reflecting the sun. The object stayed still for about a minute, then tilted and suddenly accelerated at impossible speeds, disappearing into the horizon in seconds. I felt a strange sense of awe and fear at the same time. I recorded the event on my phone and noticed a strange electromagnetic interference affecting my compass and GPS during the sighting. This was more than a mere sighting—it felt like a genuine close encounter.`,
    location: { lat: 40.7936, lng: -4.0039 },
    evidence: ['Visual', 'Photo/Video — EO/IR', 'Radar'],
    category: 'Close Encounter (CE-1)',
    date: '2025-07-15',
    media: [
      'https://images.unsplash.com/photo-1607335614551-3062bf90f30e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    likes: 15,
    dislikes: 2,
    comments: [
      {
        id: 4,
        authorId: 1,
        content: 'That sounds terrifying and amazing at the same time!',
        date: '2025-07-16',
      },
      {
        id: 5,
        authorId: 1,
        content: 'Could it have been a drone?',
        date: '2025-07-16',
      },
    ],
    creatorId: 1,
  },
  {
    id: 4,
    title: 'USO Sighting in the River',
    content: `I was kayaking early in the morning when I noticed a strange object moving under the surface of the river. The water rippled strangely, and suddenly a metallic shape emerged briefly, creating EM interference that caused my radio and phone to malfunction. It moved with incredible speed, disappearing back into the water, leaving no trace. I wasn’t alone; another kayaker witnessed the same thing. We were both in shock. I’ve never seen anything like it and can’t explain it as a conventional submarine or watercraft.`,
    location: { lat: 40.4168, lng: -3.7038 },
    evidence: ['Multi-sensor', 'EM interference'],
    category: 'Transmedium / USO',
    date: '2025-06-30',
    media: [
      'https://plus.unsplash.com/premium_photo-1688410478971-dd5e0b680465?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGFsaWVufGVufDB8fDB8fHww',
    ],
    likes: 5,
    dislikes: 0,
    comments: [
      {
        id: 6,
        authorId: 2,
        content: 'That’s insane! I would have panicked too.',
        date: '2025-06-30',
      },
    ],
    creatorId: 2,
  },
  {
    id: 5,
    title: 'Swarm Formation Over Madrid',
    content: `During a late-night drive, I noticed dozens of small lights moving in perfect formation over the city. They changed direction instantaneously, split into smaller groups, and rejoined as if controlled by a single intelligence. The patterns were highly organized, unlike anything man-made I’ve ever seen. I tried to take photos, but my phone couldn’t capture the speed and complexity of the movement. I later read reports of similar sightings in the same area, which makes me think these were genuine UAPs performing coordinated maneuvers.`,
    location: { lat: 40.75, lng: -3.75 },
    evidence: ['Visual', 'Radar'],
    category: 'Formation / Swarm',
    date: '2025-09-01',
    media: [
      'https://plus.unsplash.com/premium_photo-1688624334291-f3ae9729826b?q=80&w=1770&auto=format&fit&crop',
    ],
    likes: 20,
    dislikes: 3,
    comments: [
      {
        id: 7,
        authorId: 2,
        content:
          'This is exactly the kind of thing that makes me believe in UAPs.',
        date: '2025-09-01',
      },
    ],
    creatorId: 2,
  },
]
