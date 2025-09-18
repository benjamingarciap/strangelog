// import Encounters from './encounters/page'
// import MapWrapper from './ui/map/mapWrapper'
import { fetchEncounters } from './lib/data-encounters'
import React from 'react'
import { fetchUserById } from './lib/data-users'
import Dashboard from './ui/Dashboard'

export default async function Home(): Promise<React.ReactElement> {
  const encounters = await fetchEncounters()
  const user = await fetchUserById(121)
  console.log('Fetched user from DB:', user)
  return <Dashboard encounters={encounters} />
  // <div className="flex flex-row justify-around gap-4 w-full h-screen">
  // <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6">
  //   <div className="overflow-y-auto col-span-3 h-full">
  //     <MapWrapper encounters={encounters} />
  //   </div>
  //   <div className="overflow-y-auto col-span-3 h-full">
  //     <Encounters />
  //   </div>
  // </div>
}
