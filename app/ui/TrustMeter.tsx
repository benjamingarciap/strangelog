// import React from 'react'
// import Star from './Star'

// interface TrustMeterProps {
//   confidence: number // 0 to 5
// }

// const TrustMeter: React.FC<TrustMeterProps> = ({ confidence }) => {
//   const stars = [0, 1, 2, 3, 4].map((index) => {
//     const fraction = Math.min(Math.max(confidence - index, 0), 1)
//     return <Star key={index} index={index} fraction={fraction} />
//   })

//   return (
//     <div className="flex gap-1 bg-black p-1 w-[125px] mb-[6px]">{stars}</div>
//   )
// }

// export default TrustMeter
'use client'
import React, { useId, useMemo } from 'react'
import Star from './Star'

interface TrustMeterProps {
  confidence: number // e.g. 3.4
  maxStars?: number
  size?: number
}

export default function TrustMeter({
  confidence,
  maxStars = 5,
  size = 20,
}: TrustMeterProps): React.ReactElement {
  // useId is stable and safe inside client components. fallback to random UID if needed.
  const reactId = useId?.() ?? ''
  const uid = useMemo(
    () =>
      reactId
        ? reactId.replace(/:/g, '-')
        : `uid-${Math.random().toString(36).slice(2)}`,
    [reactId]
  )

  const avg = Number(confidence) || 0

  const stars = Array.from({ length: maxStars }).map((_, i) => {
    const fraction = Math.max(0, Math.min(1, avg - i))
    return (
      <Star
        key={`${uid}-${i}`}
        uid={uid}
        index={i}
        fraction={fraction}
        size={size}
      />
    )
  })

  // debug: uncomment to show numeric value in the DOM for quick check
  // return <div className="flex items-center gap-2"><div className="flex gap-1 bg-black p-1 rounded">{stars}</div><span className="text-sm">{avg.toFixed(1)}/5</span></div>

  return <div className="flex gap-1 bg-black p-1 w-[125px]">{stars}</div>
}
