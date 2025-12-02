// import React from 'react'

// interface StarProps {
//   fraction?: number // 0 = empty, 1 = full
//   index: number // for unique gradient ID
// }

// const Star: React.FC<StarProps> = ({ fraction = 1, index }) => {
//   const gradId = `grad-${index}` // unique per star

//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 20 20"
//       xmlns="http://www.w3.org/2000/svg"
//       className="flex-shrink-0"
//     >
//       <defs>
//         <linearGradient id={gradId}>
//           <stop offset={`${fraction * 100}%`} stopColor="white" />
//           <stop offset={`${fraction * 100}%`} stopColor="black" />
//         </linearGradient>
//       </defs>
//       <path
//         fill={`url(#${gradId})`}
//         stroke="white"
//         strokeWidth="1"
//         d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 0 0 .95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118l-3.361-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.947a1 1 0 0 0-.364-1.118l-3.36-2.44c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 0 0 .95-.69l1.286-3.946z"
//       />
//     </svg>
//   )
// }

// export default Star

import React from 'react'

interface StarProps {
  fraction?: number // 0..1
  uid: string // unique for the TrustMeter instance
  index: number // star index 0..4
  size?: number
}

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 0 0 .95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118l-3.361-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.947a1 1 0 0 0-.364-1.118l-3.36-2.44c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 0 0 .95-.69l1.286-3.946z'

export default function Star({
  fraction = 1,
  uid,
  index,
  size = 20,
}: StarProps): React.ReactElement {
  const f = Math.max(0, Math.min(1, fraction)) // clamp 0..1
  const gradId = `star-grad-${uid}-${index}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId}>
          <stop offset={`${f * 100}%`} stopColor="white" />
          <stop offset={`${f * 100}%`} stopColor="black" />
        </linearGradient>
      </defs>

      <path
        d={STAR_PATH}
        fill={`url(#${gradId})`}
        stroke="white"
        strokeWidth="0.5"
      />
    </svg>
  )
}
