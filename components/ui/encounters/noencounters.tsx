import React from 'react'

export default function NoEncounters(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold mb-4">No Encounters Found</h2>
      <p className="text-gray-600">
        There are no encounters in the current map view. Try moving the map or
        zooming out to find encounters.
      </p>
    </div>
  )
}
