'use client'
import React, { useEffect, useState } from 'react'
import { UIEnrichedEncounter } from '@/types/encounters'
import Image from 'next/image'
import { format, set } from 'date-fns'
import TrustMeter from '../TrustMeter'
import { formatCategory } from '@/lib/utils/formatCategory'
import { useRouter } from 'next/navigation'
import { useMapStore } from '../../../stores/mapStore'
import { useSession } from 'next-auth/react'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import CardButton from '../CardButton'
import CardTag from '../CardTag'
import ShareIcon from '@/icons/share.svg'
import BasicCarousel from '../BasicCarousel'
import { useUserStore } from '../../../stores/userStore'

//=========Encounter Card Component=========

export default function EncounterCard({
  encounter,
  socials,
  isSavedEncounter,
}: {
  encounter: UIEnrichedEncounter
  socials?: boolean
  isSavedEncounter?: boolean
}): React.ReactElement {
  const [saved, setSaved] = useState(isSavedEncounter || false)
  const { data: session } = useSession()
  const currentUserId = session?.user?.id
  const router = useRouter()
  const {
    title,
    content,
    media,
    comments,
    id,
    date,
    confidences,
    category,
    creator,
  } = encounter
  const user = useUserStore((state) => state.user) // User
  const initialSaved =
    user?.savedEncounters?.some(
      (enc: UIEnrichedEncounter) => enc.id === encounter.id
    ) ?? false
  // console.log('User in SaveButton:', user)
  useEffect(() => {
    console.log('Initial saved value:', initialSaved)
    if (initialSaved !== saved) {
      console.log('Updating saved state from', saved, 'to', initialSaved)
      setSaved(initialSaved)
    }
    // console.log('User in EncounterCard:', user)
  }, [initialSaved])

  const handleSave = async () => {
    setSaved(!saved)
    console.log('Initial saved state:', saved)
    console.log('Toggling save for encounter ID:', id)
    const res = await fetch('/api/encounters/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUserId,
        encounterId: id,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      console.log('Toggled save encounter:==============>', data)
      // setSaved(data.saved)
    } else {
      setSaved(false) // Revert the saved state if the request fails
      console.error('Error toggling save encounter:', data)
    }
  }

  const handleDelete = async (id?: number) => {
    const res = await fetch(`/api/encounters/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    if (res.ok) {
      console.log('Deleted successfully')
      router.refresh() // Refresh the current page to reflect changes
    } else {
      console.log('data', data)
      // setError(data.error || 'Something went wrong')
    }
  }
  return (
    <div className="mb-3">
      <div
        onMouseEnter={() => {
          if (
            useMapStore.getState().hoveredCard === null &&
            //  useMapStore.getState().markerActive === false
            useMapStore.getState().activeMarkerId === null
          ) {
            useMapStore.getState().setHoveredCard(id)
          }
        }}
        onMouseLeave={() => {
          useMapStore.getState().setHoveredCard(null)
        }}
        // className={`mb-4 m-3 hover:bg-gray-100 flex flex-col transition-colors duration-200  cursor-pointer ${
        //   socials! ? 'border-l-[0.5px]' : 'border-0'
        // } ${
        //   isLastCard && socials && 'border-r-[0.5px] w-[calc(100%+0.5px)]'
        // } border-black h-[500px]`}
        className={`mb-3 m-3 mt-0 bg-[#ffffff] hover:bg-[#e1e7e9] flex flex-col  items-center justify-center transition-colors duration-400  cursor-pointer h-[472px] rounded py-2`}
        onClick={() => {
          router.prefetch(`/encounters/${id}`) // preload page
          router.push(`/encounters/${id}`)
          useMapStore.getState().setHoveredCard(0)
        }}
      >
        <div className="flex w-full flex-col pl-3 pr-3 pb-0 h-[423px]">
          <h3 className="flex items-center text-[1rem] leading-6 font-semibold capitalize h-[32px] text-[#262626]">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </span>
          </h3>
          <span className="flex gap-2">
            <span className="w-[15px] flex items-center justify-center h-full">
              {/* <MapPinIcon className="w-8 h-8 text-gray-600" /> */}
              <Image
                src="/location-triangle.png"
                alt="Map Pin Icon"
                width={32}
                height={32}
                className="h-[13px] w-[13px]"
              />
            </span>
            <span className="flex flex-col gap-0">
              <p className="text-xs leading-4 text-gray-600 mb-[4px] h-[40px] flex justify-center items-center">
                {/* {faker.location.city().split(' ')[0]},{' '}
              {faker.location.country().split(' ')[0]} */}
                Madrid, Spain
                <br />
                {format(date, 'dd MMM yyyy')}
              </p>
            </span>
          </span>

          {confidences && (
            <div className="flex items-center justify-between gap-2 mb-[6px]">
              <span className="flex gap-2 items-center">
                <TrustMeter
                  readOnly
                  key={id}
                  confidence={
                    confidences.reduce((sum, conf) => sum + conf.level, 0) /
                    confidences.length
                  }
                />
                <p className="text-[15px] text-gray-600 mb-0">
                  {(
                    confidences.reduce((sum, conf) => sum + conf.level, 0) /
                    confidences.length
                  ).toFixed(1)}
                </p>
              </span>
              <p className="text-[12px] text-gray-600 mb-0 underline font-light">
                {/* fake Votes mock */}
                {/* Votes <span>{(Math.random() * 1000).toFixed(0)}</span> */}
                Votes {confidences.length}
              </p>
            </div>
          )}

          <div className="flex gap-1 mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
            {/* {evidence.map((tag) => (
            <span
              key={tag}
              className="flex items-center justify-center bg-[#E1E8EB] pb-[5px] px-1.5 pt-[2px] text-sm h-[29px]"
            >
              {tag}
            </span>
          ))} */}
            {category.map((tag) => (
              <CardTag key={tag}>{formatCategory(tag)}</CardTag>
            ))}
          </div>
          {media && <BasicCarousel media={media} />}
          <p className="overflow-hidden whitespace-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] mb-4 mt-[8px] text-gray-700 leading-tight text-[0.8em]">
            {content}
          </p>
        </div>
        {socials ? (
          <div className="flex w-full justify-between mb-3 gap-1 px-3">
            <div className="flex gap-1">
              <CardButton>
                <ChatBubbleBottomCenterTextIcon className="w-[18px] h-[24px]" />
                {comments.length}
              </CardButton>

              <CardButton>
                <ShareIcon className="w-[18px] h-[24px] fill-white stroke-none outline-none" />
                Share
              </CardButton>
            </div>
            {session && (
              <div>
                <CardButton handleSubmit={handleSave}>
                  <Image
                    width={13}
                    height={13}
                    className="w-[13px] h-[24px] fill-white stroke-none outline-none"
                    src={`${saved ? '/save1-white.svg' : '/save2-white.svg'}`}
                    alt={''}
                  />
                </CardButton>
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-full justify-start mb-3 gap-1 px-3">
            {currentUserId
              ? parseInt(currentUserId) === creator.id &&
                !isSavedEncounter && (
                  <>
                    {/* <CardButton>Edit</CardButton> */}
                    <CardButton id={id} handleSubmit={handleDelete}>
                      Delete
                    </CardButton>
                  </>
                )
              : null}
          </div>
        )}
      </div>
      <span className="flex justify-center">
        <div className="px-5 w-[calc(100%-30px)] border-b-[0.5px] border-gray-300" />
      </span>
    </div>
  )
}
