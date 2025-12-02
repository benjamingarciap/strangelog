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
      onClick={(e) => e.stopPropagation()}
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
