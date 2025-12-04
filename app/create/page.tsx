// 'use client'
// import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { useRouter } from 'next/navigation'
// import { useUserStore } from '@/stores/userStore'
// import uploadToCloudinary from '@/lib/utils/cloudinary'
// import TagsSelector from '@/components/ui/TagsSelector'
// import dynamic from 'next/dynamic'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

// const MapCreate = dynamic(() => import('@/components/ui/MapCreate'), {
//   ssr: false,
// })

// const CreatePage = (): React.ReactElement => {
//   const router = useRouter()
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [categories, setCategories] = useState<string[]>([])
//   const [lat, setLat] = useState<number | null>(null)
//   const [lng, setLng] = useState<number | null>(null)
//   const [images, setImages] = useState<File[]>([])
//   const [error, setError] = useState('')
//   const creatorId = useUserStore((state) => state.user?.id) || ''
//   const fetchUser = useUserStore((state) => state.fetchUser)

//   useEffect(() => {
//     fetchUser()
//   }, [fetchUser])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     if (lat === null || lng === null) {
//       setError('Please select a location on the map')
//       return
//     }
//     let imageUrlArray: string[] = []
//     try {
//       if (images.length !== 0) {
//         imageUrlArray = await Promise.all(
//           images.map(async (image) => {
//             return await uploadToCloudinary(image) // Upload image to Cloudinary
//           })
//         )
//       }
//       console.log('Uploaded image URLs:', imageUrlArray)
//     } catch (err) {
//       console.error('Error uploading images:', err)
//     }

//     console.log(
//       'Final image URLs to submit:',
//       imageUrlArray,
//       'categories:',
//       categories
//     )
//     const res = await fetch('/api/encounters', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         title,
//         content,
//         category: categories,
//         creatorId:
//           typeof creatorId === 'number' ? creatorId : parseInt(creatorId),
//         locationLat: lat,
//         locationLng: lng,
//         media: imageUrlArray,
//         evidence: [],
//       }),
//     })

//     const data = await res.json()
//     if (res.ok) {
//       router.push('/') // adjust your redirect
//     } else {
//       setError(data.error || 'Something went wrong')
//     }
//   }

//   return (
//     <div className="flex flex-col w-full gap-6 p-0 justify-center items-center">
//       <div className="w-[70%] max-h-[600px]">
//         <h2 className="text-[1.3rem] font-bold text-gray-600 capitalize mb-4">
//           Create New Encounter
//         </h2>
//         <form onSubmit={handleSubmit} className="w-full">
//           <Tabs defaultValue="text" className="w-full">
//             <TabsList className="w-full flex justify-start gap-4 sticky top-0 bg-white z-[2] border-b-[0.5px] border-black pb-2 rounded-none p-0">
//               <TabsTrigger className="w-[125px] items-end" value="text">
//                 Text
//               </TabsTrigger>
//               <TabsTrigger className="w-[125px] items-end" value="images">
//                 Images
//               </TabsTrigger>
//               <TabsTrigger className="w-[125px] items-end" value="location">
//                 Location
//               </TabsTrigger>
//             </TabsList>
//             <div className="w-full flex justify-center">
//               <TabsContent
//                 value="text"
//                 className="min-h-[560px] flex justify-center p-4 w-full"
//               >
//                 {/* <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col gap-4 w-full"
//               > */}
//                 <div className="flex flex-col gap-4 w-full">
//                   <Input
//                     type="text"
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                     className="border p-2 rounded"
//                   />
//                   {/* <input
//                   type="text"
//                   placeholder="Categories"
//                   value={categories}
//                   onChange={(e) => setCategories(e.target.value)}
//                   className="border p-2 rounded"
//                 /> */}
//                   <TagsSelector
//                     categories={categories}
//                     setCategories={setCategories}
//                   />
//                   <textarea
//                     placeholder="Content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     required
//                     className=" border p-2 rounded outline-none focus-visible:outline-none focus-visible:border-black focus-visible:ring-black focus-visible:ring-1 ring-offset-0"
//                   />

//                   {/* {error && <p className="text-red-500">{error}</p>} */}

//                   <Button
//                     variant="outline"
//                     type="submit"
//                     className="w-full rounded hover:bg-gray-300 cursor-pointer"
//                   >
//                     Submit Encounter
//                   </Button>
//                 </div>
//                 {/* </form> */}
//               </TabsContent>

//               <TabsContent
//                 value="images"
//                 className="min-h-[555px] flex justify-start items-center gap-4 p-4 flex-col"
//               >
//                 <div className="w-full min-h-50 flex justify-start items-start">
//                   <div className="grid grid-cols-3 w-full">
//                     {images.length > 0 &&
//                       images.map((image, index) => (
//                         <div key={index}>
//                           <Image
//                             onClick={() => {
//                               setImages((prev) =>
//                                 prev.filter((_, i) => i !== index)
//                               )
//                             }}
//                             src={URL.createObjectURL(image)}
//                             alt={`Upload Preview ${index + 1}`}
//                             width={250}
//                             height={100}
//                             className="object-cover rounded"
//                           />
//                         </div>
//                       ))}
//                   </div>
//                 </div>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   className=" border p-2 rounded cursor-pointer w-full text-sm file:bg-black file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer focus-visible:outline-none focus-visible:border-black"
//                   onChange={(e) => {
//                     const files = e.target.files
//                     if (files) {
//                       const fileArray = Array.from(files)
//                       setImages([...images, ...fileArray])
//                     }
//                   }}
//                 />

//                 <Button
//                   variant="outline"
//                   type="submit"
//                   className="w-full rounded hover:bg-gray-300 cursor-pointer"
//                 >
//                   Submit Encounter
//                 </Button>
//               </TabsContent>
//               <TabsContent
//                 value="location"
//                 className="min-h-[555px] flex flex-col justify-center w-full"
//               >
//                 <div className="min-h-[500px] max-h-[500px] flex justify-center w-full">
//                   <MapCreate
//                     setError={setError}
//                     setLat={setLat}
//                     setLng={setLng}
//                     lat={lat}
//                     lng={lng}
//                   />
//                 </div>
//                 <div className="mt-10 min-h-[24px]">
//                   {error && <p className="text-red-500">{error}</p>}
//                 </div>
//                 <Button
//                   variant="outline"
//                   type="submit"
//                   className="w-full rounded hover:bg-gray-300 cursor-pointer mt-4"
//                 >
//                   Submit Encounter
//                 </Button>
//               </TabsContent>
//             </div>
//           </Tabs>

//           {/* <Button
//             variant="outline"
//             type="submit"
//             className="w-full rounded hover:bg-gray-300 cursor-pointer"
//           >
//             Submit Encounter
//           </Button> */}
//         </form>
//       </div>
//     </div>
//   )
// }

// export default CreatePage
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'
import uploadToCloudinary from '@/lib/utils/cloudinary'
import TagsSelector from '@/components/ui/TagsSelector'
import dynamic from 'next/dynamic'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const MapCreate = dynamic(() => import('@/components/ui/MapCreate'), {
  ssr: false,
})

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

    if (!title.trim()) {
      setError('Title is required.')
      return
    }

    if (!content.trim()) {
      setError('Content is required.')
      return
    }

    if (categories.length === 0) {
      setError('Please select at least one category.')
      return
    }

    if (images.length === 0) {
      setError('Please upload at least one image.')
      return
    }

    if (lat === null || lng === null) {
      setError('Please select a location on the map.')
      return
    }

    let imageUrlArray: string[] = []
    try {
      if (images.length !== 0) {
        imageUrlArray = await Promise.all(
          images.map(async (image) => {
            return await uploadToCloudinary(image)
          })
        )
      }
      console.log('Uploaded image URLs:', imageUrlArray)
    } catch (err) {
      console.error('Error uploading images:', err)
      setError('Error uploading images. Please try again.')
      return
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
      router.push('/')
    } else {
      setError(data.error || 'Something went wrong')
    }
  }

  return (
    <div className="flex flex-col w-full gap-6 p-0 justify-center items-center">
      <div className="w-[70%] max-h-[600px]">
        <h2 className="text-[1.3rem] font-bold text-gray-900 capitalize mb-4">
          Create New Encounter
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="w-full flex justify-start gap-4 sticky top-0 bg-white z-[2] border-b-[0.5px] border-gray-500 pb-2 rounded-none p-0">
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

            {/* Global error message */}
            <div className="min-h-[38px]">
              {error && (
                <p className="text-red-500 py-2 font-medium text-sm">{error}</p>
              )}
            </div>

            <div className="w-full flex justify-center">
              <TabsContent
                value="text"
                className="min-h-[560px] flex justify-center p-4 w-full px-0"
              >
                <div className="flex flex-col gap-4 w-full">
                  <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                      setError('')
                    }}
                    className="border p-2 rounded"
                  />
                  <TagsSelector
                    categories={categories}
                    setCategories={(cats) => {
                      setCategories(cats)
                      setError('')
                    }}
                  />
                  <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                      setError('')
                    }}
                    className="border p-2 rounded outline-none focus-visible:outline-none focus-visible:border-black focus-visible:ring-black focus-visible:ring-1 ring-offset-0"
                  />
                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full rounded hover:bg-gray-300 cursor-pointer"
                  >
                    Submit Encounter
                  </Button>
                </div>
              </TabsContent>

              <TabsContent
                value="images"
                className="min-h-[555px] flex justify-start items-center gap-4 p-4 flex-col px-0"
              >
                <div className="w-full min-h-50 flex justify-start items-start">
                  <div className="grid grid-cols-3 w-full gap-2">
                    {images.length > 0 &&
                      images.map((image, index) => (
                        <div key={index}>
                          <Image
                            onClick={() => {
                              setImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                              setError('')
                            }}
                            src={URL.createObjectURL(image)}
                            alt={`Upload Preview ${index + 1}`}
                            width={250}
                            height={100}
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="border p-2 rounded cursor-pointer w-full text-sm file:bg-black file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer focus-visible:outline-none focus-visible:border-black"
                  onChange={(e) => {
                    const files = e.target.files
                    if (files) {
                      const fileArray = Array.from(files)
                      setImages([...images, ...fileArray])
                      setError('')
                    }
                  }}
                />

                <Button
                  variant="outline"
                  type="submit"
                  className="w-full rounded hover:bg-gray-300 cursor-pointer"
                >
                  Submit Encounter
                </Button>
              </TabsContent>

              <TabsContent
                value="location"
                className="min-h-[555px] flex flex-col justify-center w-full"
              >
                <div className="min-h-[500px] max-h-[500px] flex justify-center w-full">
                  <MapCreate
                    setError={setError}
                    setLat={(value) => {
                      setLat(value)
                      setError('')
                    }}
                    setLng={(value) => {
                      setLng(value)
                      setError('')
                    }}
                    lat={lat}
                    lng={lng}
                  />
                </div>
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full rounded hover:bg-gray-300 cursor-pointer mt-10"
                >
                  Submit Encounter
                </Button>
              </TabsContent>
            </div>
          </Tabs>
        </form>
      </div>
    </div>
  )
}

export default CreatePage
