'use client'
import React from 'react'
import EncounterCard from './EncounterCard'
import { UIEnrichedEncounter } from '../../types/encounters'

export default function EncounterList({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  // =========Rendering Encounter Cards=========
  if (encounters.length === 0) {
    return (
      <div className="flex flex-row justify-center items-center h-screen w-full">
        <p className="text-gray-600 max-w-sm">No encounters available.</p>
      </div>
    )
  } else {
    return (
      <div className=" grid [@media(max-width:929px)]:grid-cols-1 md:grid-cols-2 [@media(min-width:1408px)]:grid-cols-3 pr-3 pt-15">
        {encounters.map((encounter) => {
          return (
            <EncounterCard
              encounter={encounter}
              key={encounter.id}
              socials={true}
            />
          )
        })}
      </div>
    )
  }
}
// 'use client'
// import React, { useState } from 'react'
// import EncounterCard from './EncounterCard'
// import { UIEnrichedEncounter } from '../../types/encounters'

// export default function EncounterList({
//   encounters,
// }: {
//   encounters: UIEnrichedEncounter[]
// }): React.ReactElement {
//   const [page, setPage] = useState(0)
//   const limit = 10

//   // Filter current page
//   const paginatedEncounters = encounters.slice(
//     page * limit,
//     page * limit + limit
//   )

//   // =========Rendering Encounter Cards=========
//   if (encounters.length === 0) {
//     return (
//       <div className="flex flex-row justify-center items-center h-screen w-full">
//         <p className="text-gray-600 max-w-sm">No encounters available.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="grid [@media(max-width:929px)]:grid-cols-1 md:grid-cols-2 [@media(min-width:1408px)]:grid-cols-3 pr-3 pt-15 gap-4">
//         {paginatedEncounters.map((encounter) => (
//           <EncounterCard
//             encounter={encounter}
//             key={encounter.id}
//             socials={true}
//           />
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-between mt-4">
//         <button
//           disabled={page === 0}
//           onClick={() => setPage((prev) => prev - 1)}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {page + 1} / {Math.ceil(encounters.length / limit)}
//         </span>
//         <button
//           disabled={(page + 1) * limit >= encounters.length}
//           onClick={() => setPage((prev) => prev + 1)}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }

// 'use client'
// import React, { useState, useEffect, useRef } from 'react'
// import EncounterCard from './EncounterCard'
// import { UIEnrichedEncounter } from '../../types/encounters'

// export default function EncounterList({
//   encounters,
// }: {
//   encounters: UIEnrichedEncounter[]
// }): React.ReactElement {
//   const limit = 10
//   const [visibleCount, setVisibleCount] = useState(limit)
//   const containerRef = useRef<HTMLDivElement>(null)

//   const loadMore = () => {
//     setVisibleCount((prev) => Math.min(prev + limit, encounters.length))
//   }

//   // Infinite scroll handler
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return
//       const { scrollTop, clientHeight, scrollHeight } = containerRef.current
//       if (scrollTop + clientHeight >= scrollHeight - 100) {
//         loadMore()
//       }
//     }

//     const el = containerRef.current
//     if (el) el.addEventListener('scroll', handleScroll)

//     return () => {
//       if (el) el.removeEventListener('scroll', handleScroll)
//     }
//   }, [encounters])

//   const visibleEncounters = encounters.slice(0, visibleCount)

//   if (encounters.length === 0) {
//     return (
//       <div className="flex flex-row justify-center items-center h-screen w-full">
//         <p className="text-gray-600 max-w-sm">No encounters available.</p>
//       </div>
//     )
//   }

//   return (
//     <div ref={containerRef} className="overflow-y-auto h-screen flex flex-col">
//       <div className="grid [@media(max-width:929px)]:grid-cols-1 md:grid-cols-2 [@media(min-width:1408px)]:grid-cols-3 pr-3 pt-15 gap-4">
//         {visibleEncounters.map((encounter) => (
//           <EncounterCard
//             encounter={encounter}
//             key={encounter.id}
//             socials={true}
//           />
//         ))}
//       </div>

//       {visibleCount < encounters.length && (
//         <div className="text-center py-4 text-gray-500">Loading more...</div>
//       )}
//     </div>
//   )
// }
