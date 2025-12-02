import React from 'react'
import { Popup, useMap } from 'react-leaflet'
import BasicCarousel from '../BasicCarousel'
import { AnyProps, PointFeature } from 'supercluster'
import { useMapStore } from '@/stores/mapStore'
import { format } from 'date-fns'
import TrustMeter from '../TrustMeter'
import CardTag from '../CardTag'
import { formatCategory } from '@/lib/utils/formatCategory'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CustomPopup({
  cluster,
}: {
  cluster: PointFeature<AnyProps>
}): React.ReactElement {
  const router = useRouter()
  const map = useMap()
  return (
    <Popup minWidth={120} maxWidth={350}>
      <div
        className="cursor-pointer"
        onClick={() => {
          router.prefetch(`/encounters/${cluster.properties.id}`) // preload page
          router.push(`/encounters/${cluster.properties.id}`)
          useMapStore.getState().setHoveredCard(0)
        }}
      >
        <div
          onClick={() => {
            router.prefetch(`/encounters/${cluster.properties.id}`) // preload page
            router.push(`/encounters/${cluster.properties.id}`)
            useMapStore.getState().setHoveredCard(0)
          }}
        >
          <div className="flex w-full flex-col pl-3 pr-3 pb-0">
            <div className="flex justify-between items-center mb-1 w-full">
              <h3 className="flex items-center text-[1rem] leading-6 font-semibold capitalize h-[32px] text-[#262626]">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {cluster.properties.title}
                </span>
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  map.closePopup()
                }}
                className="cursor-pointer"
              >
                X
              </button>
            </div>
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
                  {format(cluster.properties.date, 'dd MMM yyyy')}
                </p>
              </span>
            </span>

            {cluster.properties.confidences && (
              <div className="flex items-center justify-between gap-2 mb-[6px]">
                <span className="flex gap-2 items-center">
                  <TrustMeter
                    readOnly
                    key={cluster.properties.id}
                    confidence={
                      cluster.properties.confidences.reduce(
                        (sum: number, conf: { level: number }) =>
                          sum + conf.level,
                        0
                      ) / cluster.properties.confidences.length
                    }
                  />
                  <p className="text-[15px] text-gray-600 mb-0">
                    {(
                      cluster.properties.confidences.reduce(
                        (sum: number, conf: { level: number }) =>
                          sum + conf.level,
                        0
                      ) / cluster.properties.confidences.length
                    ).toFixed(1)}
                  </p>
                </span>
                <p className="text-[12px] text-gray-600 mb-0 underline font-light">
                  {/* fake Votes mock */}
                  {/* Votes <span>{(Math.random() * 1000).toFixed(0)}</span> */}
                  Votes {cluster.properties.confidences.length}
                </p>
              </div>
            )}

            <div className="flex gap-1 mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
              {cluster.properties.category.map((tag: string) => (
                <CardTag key={tag}>{formatCategory(tag)}</CardTag>
              ))}
            </div>
            {cluster.properties.media && (
              <BasicCarousel media={cluster.properties.media} />
            )}
          </div>
        </div>
      </div>
    </Popup>
  )
}
