import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail } from 'lucide-react'
import { PublicEnrichedUser } from '../../types/user'

export default function ProfileHeader({
  user,
}: {
  user: PublicEnrichedUser
}): React.JSX.Element {
  const { lastName, firstName, avatarUrl, email, confidenceLevel } = user
  return (
    <Card className="rounded-none mb-[0px] border-r-0 border-l-0 shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24 rounded-none">
              <AvatarImage src={avatarUrl || undefined} alt="Profile" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            {/* <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
            >
              <Camera />
            </Button> */}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">
                {firstName} {lastName}
              </h1>
              <Badge variant="secondary">
                Confidence Level: {confidenceLevel}
              </Badge>
            </div>
            <p className="text-muted-foreground">Senior Logger</p>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {email}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-none hover:bg-gray-300 cursor-pointer"
          >
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
