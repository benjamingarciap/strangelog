'use client'
import React, { useState, useEffect, useRef } from 'react'
import EncounterCard from './EncounterCard'
import { UIEnrichedEncounter } from '@/types/encounters'

// Skeleton for loading state
function EncounterSkeleton() {
  return (
    <div className="grid [@media(max-width:929px)]:grid-cols-1 md:grid-cols-2 [@media(min-width:1408px)]:grid-cols-3 pr-3 pt-15 gap-4">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse [animation-duration:0.8s] h-[456px] bg-gray-300 rounded w-full pl-3 pr-3 "
        />
      ))}
    </div>
  )
}

export default function EncounterList({
  encounters,
  loading = false,
}: {
  encounters: UIEnrichedEncounter[]
  loading?: boolean
}): React.ReactElement {
  const limit = 10
  const [visibleCount, setVisibleCount] = useState(limit)
  const containerRef = useRef<HTMLDivElement>(null)

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + limit, encounters.length))
  }

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMore()
      }
    }

    const el = containerRef.current
    if (el) el.addEventListener('scroll', handleScroll)

    return () => {
      if (el) el.removeEventListener('scroll', handleScroll)
    }
  }, [encounters])

  // Auto-load more if container is not scrollable
  useEffect(() => {
    if (!containerRef.current) return
    const { scrollHeight, clientHeight } = containerRef.current
    if (scrollHeight <= clientHeight && visibleCount < encounters.length) {
      loadMore()
    }
  }, [encounters, visibleCount])

  if (loading) {
    return (
      <div
        className="overflow-y-auto h-screen flex flex-col"
        ref={containerRef}
      >
        <EncounterSkeleton />
      </div>
    )
  }

  if (encounters.length === 0) {
    return (
      <div className="flex flex-row justify-center items-center h-screen w-full">
        <p className="text-gray-600 max-w-sm">No encounters available.</p>
      </div>
    )
  }

  const visibleEncounters = encounters.slice(0, visibleCount)
  if (loading) {
    return <EncounterSkeleton />
  } else {
    return (
      <div
        ref={containerRef}
        className="overflow-y-auto h-screen flex flex-col"
      >
        <div className="grid [@media(max-width:929px)]:grid-cols-1 md:grid-cols-2 [@media(min-width:1408px)]:grid-cols-3 pr-3 pt-15 gap-4">
          {visibleEncounters.map((encounter) => (
            <EncounterCard
              encounter={encounter}
              key={encounter.id}
              socials={true}
            />
          ))}
        </div>

        {visibleCount < encounters.length && (
          <div className="text-center py-4 text-gray-500">Loading more...</div>
        )}
      </div>
    )
  }
}
