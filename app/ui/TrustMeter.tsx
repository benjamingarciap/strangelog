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
// 'use client'
// import React, { useId, useMemo } from 'react'
// import Star from './Star'

// interface TrustMeterProps {
//   confidence: number // e.g. 3.4
//   maxStars?: number
//   size?: number
// }

// export default function TrustMeter({
//   confidence,
//   maxStars = 5,
//   size = 20,
// }: TrustMeterProps): React.ReactElement {
//   // useId is stable and safe inside client components. fallback to random UID if needed.
//   const reactId = useId?.() ?? ''
//   const uid = useMemo(
//     () =>
//       reactId
//         ? reactId.replace(/:/g, '-')
//         : `uid-${Math.random().toString(36).slice(2)}`,
//     [reactId]
//   )

//   const avg = Number(confidence) || 0

//   const stars = Array.from({ length: maxStars }).map((_, i) => {
//     const fraction = Math.max(0, Math.min(1, avg - i))
//     return (
//       <Star
//         key={`${uid}-${i}`}
//         uid={uid}
//         index={i}
//         fraction={fraction}
//         size={size}
//       />
//     )
//   })

//   return <div className="flex gap-1 bg-black p-1 w-[125px]">{stars}</div>
// }
'use client'
import React, { useState } from 'react'
import Rating from '@mui/material/Rating'

export default function TrustMeter({
  confidence,
  maxStars = 5,
  readOnly,
}: {
  confidence: number
  maxStars?: number
  readOnly?: boolean
}): React.ReactElement {
  const [value, setValue] = useState(confidence)

  return (
    <Rating
      name="trust-meter"
      value={value}
      precision={0.5} // Allows fractional ratings like 3.4
      max={maxStars}
      readOnly={readOnly}
      onChange={(_, newValue) => {
        if (newValue !== null) setValue(newValue)
      }}
      sx={{
        '& .MuiRating-iconFilled': { color: '#000' },
        '& .MuiRating-iconEmpty': { color: '#AAB5B9' },
      }}
    />
  )
}
