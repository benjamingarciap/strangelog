import React from 'react'
import { PublicEnrichedUser } from '../../types/user'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

import EncounterCard from '../encounters/EncounterCard'

export default function ProfileContent({
  user,
}: {
  user: PublicEnrichedUser
}): React.JSX.Element {
  const { encounters } = user
  return (
    <Tabs defaultValue="encounters" className="space-y-6 gap-0">
      <TabsList className="grid w-full grid-cols-4 p-0">
        <TabsTrigger value="encounters">Encounters</TabsTrigger>
        <TabsTrigger value="saved-encounters">Saved Encounters</TabsTrigger>
        <TabsTrigger value="personal">Personal</TabsTrigger>
      </TabsList>

      {/* Encounters */}
      <TabsContent value="encounters" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 pt-13">
          {encounters.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No encounters found.
            </div>
          ) : (
            encounters.map((encounter) => (
              <EncounterCard
                key={encounter.id}
                encounter={encounter}
                socials={false}
              />
            ))
          )}
        </div>
      </TabsContent>

      {/* Saved Encounters */}
      <TabsContent value="saved-encounters" className="space-y-6">
        <Card className="rounded-none border-r-0 border-l-0 shadow-none">
          <CardHeader>
            <CardTitle>Saved Encounters</CardTitle>
            <CardDescription>
              Update your personal details and profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">firstName</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" defaultValue="Senior Product Designer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Inc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue="Passionate product designer with 8+ years of experience creating user-centered digital experiences. I love solving complex problems and turning ideas into beautiful, functional products."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="San Francisco, CA" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Personal Information */}
      <TabsContent value="personal" className="space-y-6">
        <Card className="rounded-none border-r-0 border-l-0 shadow-none">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">firstName</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" defaultValue="Senior Product Designer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Inc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue="Passionate product designer with 8+ years of experience creating user-centered digital experiences. I love solving complex problems and turning ideas into beautiful, functional products."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="San Francisco, CA" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
