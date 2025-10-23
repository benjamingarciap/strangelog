import React from 'react'
// EncounterListSkeleton.tsx
export default function EncounterListSkeleton(): React.ReactElement {
  return (
    <div className="space-y-3 animate-pulse h-[456px]">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded"></div>
      ))}
    </div>
  )
}
