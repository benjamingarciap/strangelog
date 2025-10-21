export default async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
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

    // You can customize this to include more detail
    const address = data.display_name || null
    console.log('Reverse geocoded address:', address)
    return address
  } catch (err) {
    console.error('Reverse geocoding failed:', err)
    return null
  }
}
