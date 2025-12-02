import React from 'react'
import { fetchUserById } from '@/lib/data-users'
import Profile from '@/components/ui/profile/Profile'

export default async function UserPage(props: {
  params: Promise<{ id: string }>
}): Promise<React.ReactElement> {
  // Fetch user data based on ID from params
  const params = await props.params
  const id = parseInt(params.id, 10)
  const user = await fetchUserById(Number(id))

  // Handle case where user is not found
  if (!user) {
    return <div className="mt-20 p-4">User not found</div>
  }

  // Destructure user data

  // Render user profile
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[100px]">
      <div className="flex flex-col mx-auto space-y-6 border-x-black border-y-0 border-[0.5px] w-[70%] px-6">
        <Profile user={user} />
      </div>
    </div>
  )
}
