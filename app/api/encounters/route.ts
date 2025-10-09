import { NextResponse } from 'next/server'
import { createEncounter } from '../../lib/actions'
import { fetchEncounters } from '../../lib/data-encounters'

// GET /api/encounters → list all
export async function GET(): Promise<NextResponse> {
  try {
    const encounters = await fetchEncounters()
    return NextResponse.json(encounters)
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: 'Failed to fetch encounters' },
      { status: 500 }
    )
  }
}

// POST /api/encounters → create
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json()
    const newEncounter = await createEncounter(body)
    return NextResponse.json(newEncounter, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to create encounter' },
      { status: 500 }
    )
  }
}
