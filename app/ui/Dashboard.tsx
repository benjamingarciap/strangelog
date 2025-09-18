// 'use client'
// import React from 'react'
// import EncounterList from './encounters/EncounterList'
// import MapWrapper from './map/MapWrapper'
// import { useMapStore } from '../../stores/mapStore'
// import { useSideMenuStore } from '../../stores/sideMenuStore'
// import { UIEnrichedEncounter } from '../types/encounters'
// import { SideMenu } from './SideMenu'

// export default function Dashboard({
//   encounters,
// }: {
//   encounters: UIEnrichedEncounter[]
// }): React.ReactElement {
//   console.log('Fetched encounters from DB:', encounters)
//   const isFullscreen = useMapStore((state) => state.isFullscreen)
//   const { isOpen } = useSideMenuStore()
//   return (
//     // <div className="flex flex-row justify-around gap-4 w-full h-screen">
//     <div className="flex flex-row justify-around gap-4 w-full h-screen">
//       <div
//         className={`w-full h-screen grid grid-cols-1 sm:grid-cols-6 ${
//           isOpen ? 'md:grid-cols-7' : 'md:grid-cols-6'
//         }`}
//       >
//         {/* <div className="overflow-y-auto col-span-3 h-full"> */}
//         {isOpen && <SideMenu />}
//         <div
//           className={`overflow-y-auto ${
//             isFullscreen ? 'col-span-6' : 'col-span-3'
//           } h-full`}
//         >
//           <MapWrapper encounters={encounters} />
//         </div>
//         <div
//           className={`overflow-y-auto ${
//             isFullscreen ? 'hidden' : 'col-span-3'
//           } h-full`}
//         >
//           <EncounterList encounters={encounters} />
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'
import React from 'react'
import EncounterList from './encounters/EncounterList'
import MapWrapper from './map/MapWrapper'
import { useMapStore } from '../../stores/mapStore'
import { useSideMenuStore } from '../../stores/sideMenuStore'
import { UIEnrichedEncounter } from '../types/encounters'
import { SideMenu } from './SideMenu'

export default function Dashboard({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  console.log('Fetched encounters from DB:', encounters)
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  const { isOpen } = useSideMenuStore()

  return (
    // <div className="flex w-full h-screen">
    //   {/* Side Menu */}
    //   {isOpen && (
    //     <div className="h-full w-64 flex-shrink-0">
    //       <SideMenu />
    //     </div>
    //   )}
    <div className="flex w-full h-screen">
      <div
        className={`h-full flex-shrink-0 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        } border-r-1 border-black`}
      >
        {isOpen && <SideMenu />}
      </div>

      {/* Map */}
      <div
        className={`overflow-y-auto h-full ${
          isFullscreen ? 'w-full' : 'w-1/2'
        }`}
      >
        <MapWrapper encounters={encounters} />
      </div>

      {/* Encounter List */}
      {!isFullscreen && (
        <div
          className={`overflow-y-auto h-full ${
            isFullscreen ? 'hidden' : 'w-1/2'
          }`}
        >
          <EncounterList encounters={encounters} />
        </div>
      )}
    </div>
  )
}
