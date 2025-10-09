import { NextResponse } from 'next/server'
import { fetchEncounterById } from '@/app/lib/data-encounters'
import {
  updateEncounter,
  deleteEncounter,
  createEncounter,
} from '@/app/lib/actions'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const encounter = await fetchEncounterById(Number(params.id))
    if (!encounter)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(encounter)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch encounter', errorDetail: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json()
    const newEncounter = await createEncounter(body)
    return NextResponse.json(newEncounter, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create encounter', errorDetail: String(error) },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const body = await req.json()
    const updated = await updateEncounter(Number(params.id), body)
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update encounter', errorDetail: String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await deleteEncounter(Number(params.id))
    return NextResponse.json({ message: 'Encounter deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete encounter', errorDetail: String(error) },
      { status: 500 }
    )
  }
}
