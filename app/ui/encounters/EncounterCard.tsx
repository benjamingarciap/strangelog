'use client'
import React from 'react'
import { UIEnrichedEncounter } from '../../types/encounters'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

//=========Encounter Card Component=========

export default function EncounterCard({
  encounter,
}: {
  encounter: UIEnrichedEncounter
}): React.ReactElement {
  const router = useRouter()
  const { title, content, evidence, media, likes, creator, comments, id } =
    encounter

  return (
    <div
      className={`flex flex-col justify-between hover:bg-gray-200 transition-colors duration-200  cursor-pointer border-[0.5px] border-black`}
    >
      {media && (
        <Carousel className="relative group">
          {/* <Link href={`/encounters/${encounter.id}`} className="flex flex-col"> */}
          <CarouselContent>
            {media.map((image) => {
              return (
                <CarouselItem key={image}>
                  <img src={image} alt="Carousel Item" />
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-200 " />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-200 " />
        </Carousel>
      )}
      <div
        onClick={(e) => {
          router.prefetch(`/encounters/${id}`) // preload page
          router.push(`/encounters/${id}`)
        }}
      >
        <div className="flex w-full flex-col pt-3 pl-3 pr-3 pb-0 h-[260px]">
          <div className="flex">
            <h2
              className="capitalize font-semibold text-gray-700 hover:underline cursor-pointer"
              onClick={(e) => {
                router.prefetch(`/users/${creator.id}`) // preload page
                router.push(`/users/${creator.id}`)
                e.stopPropagation() // stops the Link to encounter from firing
              }}
            >
              {creator.username}
            </h2>
          </div>

          {/* </Link> */}
          <h3 className="text-xl font-semibold mb-1 capitalize">{title}</h3>

          <p className="flex flex-wrap gap-2 mb-1 overflow-hidden text-ellipsis whitespace-normal">
            {evidence.map((tag) => (
              <span key={tag} className="bg-gray-200/20 px-1.5 py-0.5 text-sm ">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </p>

          <p className="overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] mb-4">
            {content}
          </p>
        </div>
        <div className="flex w-full justify-around mb-3">
          <div className="comments flex gap-1 hover:bg-gray-300">
            <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
            {comments.length}
          </div>
          <div className="likes flex gap-1">
            <button className="hover:bg-gray-300">
              <ArrowDownIcon className="w-6 h-6" />
            </button>
            <span>{likes}</span>
            <button className="hover:bg-gray-300">
              <ArrowUpIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
