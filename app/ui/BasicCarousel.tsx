import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default function BasicCarousel({
  media,
}: {
  media: string[]
}): React.ReactElement {
  return (
    <Carousel className="relative group w-full h-[216px] overflow-hidden">
      <CarouselContent className="h-[216px]">
        {media.map((image, index) => {
          return (
            <CarouselItem key={image} className="relative w-full rounded">
              <Image
                src={image}
                alt="Carousel Item"
                loading={index === 0 ? 'eager' : 'lazy'} // only first is eager
                className="object-cover rounded"
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
  )
}
