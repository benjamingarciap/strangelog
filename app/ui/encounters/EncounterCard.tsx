'use client'
import React from 'react'
import { UIEnrichedEncounter } from '../../types/encounters'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { format } from 'date-fns'
import TrustMeter from '../TrustMeter'
import { formatCategory } from '../../lib/utils/formatCategory'
import { useRouter } from 'next/navigation'
import { useMapStore } from '../../../stores/mapStore'

//=========Encounter Card Component=========

export default function EncounterCard({
  encounter,
  socials,
  isLastCard,
  isSavedEncounter,
}: {
  encounter: UIEnrichedEncounter
  socials?: boolean
  isLastCard?: boolean
  isSavedEncounter?: boolean
}): React.ReactElement {
  const router = useRouter()
  const { title, content, media, comments, id, date, confidences, category } =
    encounter

  return (
    <div
      onMouseEnter={() => {
        if (
          useMapStore.getState().hoveredCard === null &&
          useMapStore.getState().markerActive === false
        ) {
          useMapStore.getState().setHoveredCard(id)
        }
      }}
      onMouseLeave={() => {
        useMapStore.getState().setHoveredCard(null)
      }}
      className={`flex flex-col transition-colors duration-200  cursor-pointer ${
        socials! ? 'border-l-[0.5px]' : 'border-0'
      } ${
        isLastCard && socials && 'border-r-[0.5px] w-[calc(100%+0.5px)]'
      } border-black h-[500px]`}
      onClick={() => {
        router.prefetch(`/encounters/${id}`) // preload page
        router.push(`/encounters/${id}`)
        useMapStore.getState().setHoveredCard(0)
      }}
    >
      <div className="flex w-full flex-col pt-3 pl-3 pr-3 pb-0 h-[448px]">
        <h3 className="text-xl font-semibold capitalize overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] h-[32px]">
          {title}
        </h3>
        <span className="flex gap-2 mb-[2px]">
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
            <p className="text-[16px] text-gray-600 mb-[4px] h-[40px] leading-tight">
              {/* {faker.location.city().split(' ')[0]},{' '}
              {faker.location.country().split(' ')[0]} */}
              Madrid, Spain
              <br />
              {format(date, 'dd MMM yyyy')}
            </p>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">4.3 out of 5</span>
          </div>
        </span>

        {confidences && (
          <div className="flex items-center justify-between gap-2 mb-[6px]">
            <span className="flex gap-2 items-center">
              <TrustMeter
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
            <p className="text-[15px] text-gray-600 mb-0 underline font-light">
              {/* fake Votes mock */}
              Votes <span>{(Math.random() * 1000).toFixed(0)}</span>
              {/* Votes {confidences.length} */}
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
            <span
              key={tag}
              className="flex items-center justify-center bg-[#E1E8EB] pb-[2px] px-1.5 pt-[2px] text-sm h-[21px]"
            >
              {formatCategory(tag)}
            </span>
          ))}
        </div>
        {media && (
          <Carousel className="relative group w-full h-[216px] overflow-hidden">
            <CarouselContent className="h-[216px]">
              {media.map((image, index) => {
                return (
                  <CarouselItem key={image} className="relative w-full">
                    <Image
                      src={image}
                      alt="Carousel Item"
                      loading={index === 0 ? 'eager' : 'lazy'} // only first is eager
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-200 border-none z-[10000]" />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-200 border-none z-[10000]" />
          </Carousel>
        )}
        <p className="overflow-hidden whitespace-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] mb-4 mt-[8px] text-gray-700 leading-tight">
          {content}
        </p>
      </div>
      {socials ? (
        <div className="flex w-full justify-start mb-3 gap-1 px-3">
          <button
            className="comments flex gap-1 hover:bg-gray-300 bg-[#E1E8EB] px-2 pb-[2px] pt-[4px] justify-center items center cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <ChatBubbleBottomCenterTextIcon className="w-[18px] h-[24px]" />
            {comments.length}
          </button>

          <button
            className="comments flex gap-1 hover:bg-gray-300 bg-[#E1E8EB] px-2 pb-[2px] pt-[4px] justify-center items center cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src="share.svg" alt="Share" width={18} height={24} />
            Share
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-start mb-3 gap-1 px-3">
          {!isSavedEncounter && (
            <button
              className="comments flex gap-1 hover:bg-gray-300 bg-[#E1E8EB] px-2 pb-[2px] pt-[4px] justify-center items-center cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              Edit
            </button>
          )}

          <button
            className="comments flex gap-1 hover:bg-gray-300 bg-[#E1E8EB] px-2 pb-[2px] pt-[4px] justify-center items-center cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            Delete
          </button>
        </div>
      )}
      <span className="flex justify-center">
        <div className="px-5 w-[calc(100%-30px)] border-b-[0.5px] border-black" />
      </span>
    </div>
  )
}
