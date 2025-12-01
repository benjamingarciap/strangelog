'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../stores/userStore'
import uploadToCloudinary from '../lib/utils/cloudinary'
import TagsSelector from '../ui/TagsSelector'
import dynamic from 'next/dynamic'
const MapCreate = dynamic(() => import('../ui/MapCreate'), { ssr: false })

const CreatePage = (): React.ReactElement => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [error, setError] = useState('')
  const creatorId = useUserStore((state) => state.user?.id) || ''
  const fetchUser = useUserStore((state) => state.fetchUser)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (lat === null || lng === null) {
      setError('Please select a location on the map')
      return
    }
    let imageUrlArray: string[] = []
    try {
      if (images.length !== 0) {
        imageUrlArray = await Promise.all(
          images.map(async (image) => {
            return await uploadToCloudinary(image) // Upload image to Cloudinary
          })
        )
      }
      console.log('Uploaded image URLs:', imageUrlArray)
    } catch (err) {
      console.error('Error uploading images:', err)
    }

    console.log(
      'Final image URLs to submit:',
      imageUrlArray,
      'categories:',
      categories
    )
    const res = await fetch('/api/encounters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        category: categories,
        creatorId:
          typeof creatorId === 'number' ? creatorId : parseInt(creatorId),
        locationLat: lat,
        locationLng: lng,
        media: imageUrlArray,
        evidence: [],
      }),
    })

    const data = await res.json()
    if (res.ok) {
      router.push('/') // adjust your redirect
    } else {
      setError(data.error || 'Something went wrong')
    }
  }

  return (
    <div className="flex flex-col w-full gap-6 p-0 justify-center items-center">
      <div className="w-[70%] max-h-[600px]">
        <h2 className="text-[1.3rem] font-bold text-gray-600 capitalize mb-4">
          Create New Encounter
        </h2>
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="w-full flex justify-start gap-4 sticky top-0 bg-white z-[2] border-b-[0.5px] border-black pb-2 rounded-none p-0">
            <TabsTrigger className="w-[125px] items-end" value="text">
              Text
            </TabsTrigger>
            <TabsTrigger className="w-[125px] items-end" value="images">
              Images
            </TabsTrigger>
            <TabsTrigger className="w-[125px] items-end" value="location">
              Location
            </TabsTrigger>
          </TabsList>
          <div className="w-full flex justify-center">
            <TabsContent
              value="text"
              className="min-h-[560px] flex justify-center p-4 w-full"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border p-2 rounded"
                />
                {/* <input
                  type="text"
                  placeholder="Categories"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="border p-2 rounded"
                /> */}
                <TagsSelector
                  categories={categories}
                  setCategories={setCategories}
                />
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="border p-2 rounded"
                />

                {error && <p className="text-red-500">{error}</p>}

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  Submit Encounter
                </button>
              </form>
            </TabsContent>

            <TabsContent
              value="images"
              className="min-h-[555px] flex justify-center items-center gap-4 p-4"
            >
              <span>Images</span>
              {images.length > 0 &&
                images.map((image, index) => (
                  <div key={index}>
                    <Image
                      onClick={() => {
                        setImages((prev) => prev.filter((_, i) => i !== index))
                      }}
                      src={URL.createObjectURL(image)}
                      alt={`Upload Preview ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              <input
                type="file"
                accept="image/*"
                multiple
                className="border p-2 rounded cursor-pointer"
                onChange={(e) => {
                  const files = e.target.files
                  if (files) {
                    const fileArray = Array.from(files)
                    setImages([...images, ...fileArray])
                  }
                }}
              />
            </TabsContent>
            <TabsContent
              value="location"
              className="min-h-[555px] flex justify-center w-full"
            >
              <MapCreate setLat={setLat} setLng={setLng} lat={lat} lng={lng} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default CreatePage
