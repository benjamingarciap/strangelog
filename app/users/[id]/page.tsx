import React from 'react'
import { fetchUserById } from '../../lib/data-users'
import ProfileHeader from '../../ui/profile/profile-header'
import ProfileContent from '../../ui/profile/profile-content'

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
    <div className="max-h-full flex flex-col justify-center items-center mt-[15px] w-full overflow-y-auto">
      <div className="max-h-full container mx-auto space-y-6 px-4 sm:px-6 md:px-8 lg:px-40 py-10 h-[100vh]">
        <ProfileHeader user={user} />
        <ProfileContent user={user} />
      </div>
    </div>
  )
}
