import React from 'react'
import { fetchUserById } from '../../lib/data-users'

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
  const { username, email, bio, avatarUrl, encounters, reactions } = user

  // Render user profile
  return (
    <div className="mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">{username}'s profile</h1>

      <>
        <p>User Name: {username}</p>
        <br />
        <p>Email: {email}</p>
        <br />
        <p>Bio: {bio}</p>
        <br />
        <img
          src={
            avatarUrl
              ? avatarUrl
              : 'https://avatars.githubusercontent.com/u/85882297'
          }
          alt={`${username}'s avatar`}
          className="w-24 h-24 rounded-full"
        />
        <br />
        <p>Encounters: {encounters.length}</p>
        <br />
        <p>Reactions: {reactions.length}</p>
      </>

      {/* Additional user info can be displayed here */}
    </div>
  )
}
