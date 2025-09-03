export interface Encounter {
  id: number
  title: string
  content: string
  location: {
    lat: number
    lng: number
  }
  category: 'UFO' | 'Haunting' | 'Cryptid' | 'Poltergeist' | string
  date: string // could use Date if you want to parse it
  media: string[] // array of URLs
}
