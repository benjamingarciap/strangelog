import React from 'react'

export default function DashboardContent({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <div className="flex w-full h-screen">{children}</div>
}
