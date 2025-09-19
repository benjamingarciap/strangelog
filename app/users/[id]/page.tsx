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
    <div className="max-h-full flex flex-col justify-center items-center mt-[55px] w-full overflow-y-auto">
      {/* <div className="max-h-full flex max-w-4xl flex-col p-6 my-1.5 mx-1.5">
        <img
          src={
            avatarUrl
              ? avatarUrl
              : 'https://avatars.githubusercontent.com/u/85882297'
          }
          alt={`${username}'s avatar`}
          className="w-24 h-24 rounded-full"
        />
        <h1 className="text-2xl font-bold mb-4">{username}'s profile</h1>

        <p>User Name: {username}</p>
        <br />
        <p>Email: {email}</p>
        <br />
        <p>Bio: {bio}</p>
        <br />
        <br />
        <h2>ENCOUNTERS</h2>
        {encounters.map((encounter) => {
          return (
            <Link href={`/encounters/${encounter.id}`} key={encounter.id}>
              <div className="border p-4 my-2">
                <h3 className="font-semibold capitalize">{encounter.title}</h3>
                <div>
                  {encounter.comments.map((comment) => (
                    <p key={comment.id}>{comment.content} </p>
                  ))}
                </div>
                <div className="flex flex-wrap">
                  {encounter.media.map((mediaUrl, index) => (
                    <img
                      key={index}
                      src={mediaUrl}
                      alt={`Media ${index + 1}`}
                      className="w-32 h-32 object-cover m-1"
                    />
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
        <br />

      </div> */}
      <div className="max-h-full container mx-auto space-y-6 px-4 py-10">
        <ProfileHeader user={user} />
        <ProfileContent user={user} />
      </div>
    </div>
  )
}
