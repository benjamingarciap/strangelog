import React from 'react'
import { PublicEnrichedUser } from '@/types/user'
import Image from 'next/image'
import TrustMeter from '../TrustMeter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EncounterCard from '../encounters/EncounterCard'
import { UIEnrichedEncounter } from '@/types/encounters'

export default function Profile({
  user,
}: {
  user: PublicEnrichedUser
}): React.JSX.Element {
  const {
    username,
    lastName,
    firstName,
    avatarUrl,
    confidenceLevel,
    bio,
    encounters,
    savedEncounters,
  } = user
  console.log('User in ProfileHeader:', user)

  return (
    <div className="flex flex-col w-full gap-6 p-0">
      {/* Profile info (sticky if desired) */}
      <div className="bg-white w-full p-4 sticky top-0 z-2 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <div className="relative h-[128px] w-[128px]">
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative h-[128px] w-[128px] flex-shrink-0">
                <Image
                  src={'/Alien-Head-Graphics-3993763-1.jpg'}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col justify-center gap-0">
              <h2 className="text-[1.3rem] font-bold text-gray-600 capitalize">
                {firstName} {lastName}
              </h2>
              <p className="text-[1rem] font-semibold text-gray-500 lowercase">
                @{username}
              </p>

              {/* <TrustMeter confidence={confidenceLevel} readOnly /> */}
              <p className="text-[rem] font-bold text-gray-500 capitalize ">
                AC: {confidenceLevel}
              </p>
            </div>
          </div>

          {/* Bio */}
          {bio && <p className="text-gray-600 mt-2">{bio}</p>}
        </div>

        {/* Edit Profile Button */}
        <button className="flex items-center h-[34px] px-5 py-1 mt-2 cursor-pointer bg-gray-100 hover:bg-gray-200">
          <span className="font-sans text-[12px] font-medium">
            Edit Profile
          </span>
        </button>
      </div>

      {/* Tabs + EncounterCards */}

      <div className="w-full max-h-[600px]">
        <Tabs defaultValue="submitted" className="w-full">
          <TabsList className="w-full flex justify-start gap-4 sticky top-0 bg-white z-5 border-b-[0.5px] border-gray-300 pb-2 rounded-none p-0">
            <TabsTrigger className="w-[125px] items-end" value="submitted">
              My encounters
            </TabsTrigger>
            <TabsTrigger value="saved">Saved encounters</TabsTrigger>
          </TabsList>

          {/* Reports Submitted */}
          <TabsContent value="submitted">
            {encounters.length > 0 ? (
              <div className="min-h-[560px] max-h-[560px] grid grid-cols-3 gap-4 pt-4 [@media(max-width:1232px)]:grid-cols-2 [@media(max-width:796px)]:grid-cols-1 overflow-y-auto">
                {encounters.map((encounter: UIEnrichedEncounter) => (
                  <EncounterCard encounter={encounter} />
                ))}
              </div>
            ) : (
              <div className="min-h-[560px] w-full h-full flex justify-center items-center">
                <p className="text-gray-500 text-2xl">
                  No reports submitted yet.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Reports Saved */}
          <TabsContent
            value="saved"
            // className="min-h-[555px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0"
            // className="min-h-[560px] grid grid-cols-3 gap-4 pt-4 [@media(max-width:1232px)]:grid-cols-2 [@media(max-width:796px)]:grid-cols-1"
          >
            {savedEncounters.length > 0 ? (
              <div className="min-h-[560px] max-h-[560px] grid grid-cols-3 gap-4 pt-4 [@media(max-width:1232px)]:grid-cols-2 [@media(max-width:796px)]:grid-cols-1 overflow-y-auto">
                {savedEncounters.map((savedEncounter: UIEnrichedEncounter) => (
                  <EncounterCard
                    key={savedEncounter.id}
                    encounter={savedEncounter}
                    isSavedEncounter={true}
                  />
                ))}
              </div>
            ) : (
              <div className="min-h-[560px] w-full h-full flex justify-center items-center">
                <p className="text-gray-500 text-2xl">No saved reports yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
