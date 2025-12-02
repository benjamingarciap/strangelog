export interface ReverseGeocodeResult {
  country: string | null
  city: string | null
  street: string | null
  postcode: string | null
  fullAddress: string | null
}

export default async function reverseGeocode(
  lat: number,
  lng: number
): Promise<ReverseGeocodeResult | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'StrangelogApp/1.0 (bengarc@gmail.com)',
        },
      }
    )

    if (!res.ok) throw new Error('Failed to fetch location')

    const data = await res.json()
    const addr = data.address || {}

    return {
      country: addr.country || null,
      city: addr.city || addr.town || addr.village || addr.municipality || null,
      street: addr.road || null,
      postcode: addr.postcode || null,
      fullAddress: data.display_name || null,
    }
  } catch (err) {
    console.error('Reverse geocoding failed:', err)
    return null
  }
}
