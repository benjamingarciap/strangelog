import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { toggleSaveEncounter } from '@/lib/actions'

export async function POST(req: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { encounterId } = await req.json()

  try {
    const result = await toggleSaveEncounter(
      Number(session.user.id),
      encounterId
    )
    return NextResponse.json(result)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to toggle save' },
      { status: 500 }
    )
  }
}
