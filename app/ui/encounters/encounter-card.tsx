'use client'
import React from 'react'
import { UIEnrichedEncounter } from '../../types/encounters'
import Link from 'next/link'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline'
import router from 'next/router'
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
  // =========Using Map Store to Log Bounds=========

  const { title, content, evidence, media, likes, creator, comments } =
    encounter

  return (
    <div className="relative flex flex-col justify-between hover:bg-gray-100 transition-colors duration-200  cursor-pointer border border-gray-500">
      <Carousel className="relative group">
        <CarouselContent>
          {media.map((image) => {
            return (
              <CarouselItem key={image}>
                <img src={image} alt="Carousel Item" />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Carousel>
      <Link href={`/encounters/${encounter.id}`} className="flex flex-col">
        <div className="flex w-full flex-col pt-3 pl-3 pr-3 pb-0">
          {/* <Link
            href={`/users/${creator.id}`}
            onClick={(e) => e.stopPropagation()} // stops bubbling
          > */}
          <h2
            className="capitalize font-semibold text-gray-700 hover:underline cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/users/${creator.id}`)
              // your button logic here
            }}
          >
            {creator.username}
          </h2>
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
      </Link>
    </div>
  )
}
