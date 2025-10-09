export default async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset)
    throw new Error('Cloudinary env vars missing')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )
    console.log('Cloudinary response:', res)
    if (!res.ok) throw new Error('Cloudinary upload failed' + res.statusText)
    console.log('Cloudinary response:', res)
    const data = await res.json()
    return data.secure_url
  } catch (err) {
    console.log(err)
    throw err
  }
}
