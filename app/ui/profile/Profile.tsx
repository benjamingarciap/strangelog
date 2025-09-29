import React from 'react'
import { PublicEnrichedUser } from '../../types/user'
import Image from 'next/image'
import TrustMeter from '../TrustMeter'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs'
import EncounterCard from '../encounters/EncounterCard'

export default function Profile({
  user,
}: {
  user: PublicEnrichedUser
}): React.JSX.Element {
  const {
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
          <div className="flex items-end gap-4">
            {avatarUrl && (
              <div className="relative h-[100px] w-[100px] flex-shrink-0">
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h1 className="text-[1.3rem] font-bold text-gray-600 capitalize">
                {firstName} {lastName}
              </h1>
              <div className="flex items-center gap-2">
                <TrustMeter confidence={confidenceLevel} readOnly />
                <p className="text-[0.8rem] text-gray-500">
                  Average confidence: {confidenceLevel}
                </p>
              </div>
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
      {encounters && encounters.length > 0 && (
        <div className="w-full max-h-[600px] overflow-y-auto">
          <Tabs defaultValue="submitted" className="w-full">
            <TabsList className="w-full flex justify-start gap-4 sticky top-0 bg-white z-5 border-b-[0.5px] border-black pb-2 rounded-none p-0">
              <TabsTrigger className="w-[125px] items-end" value="submitted">
                Reports Submitted
              </TabsTrigger>
              <TabsTrigger value="saved">Reports Saved</TabsTrigger>
            </TabsList>

            {/* Reports Submitted */}
            <TabsContent
              value="submitted"
              className="min-h-[560px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"
            >
              {encounters.map((encounter) => (
                <EncounterCard key={encounter.id} encounter={encounter} />
              ))}
            </TabsContent>

            {/* Reports Saved */}
            <TabsContent
              value="saved"
              className="min-h-[555px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"
            >
              {savedEncounters.map((savedEncounter) => (
                <EncounterCard
                  key={savedEncounter.id}
                  encounter={savedEncounter}
                  isSavedEncounter={true}
                />
              ))}
              <p className="text-gray-500">No saved reports yet.</p>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
