import { NextResponse } from 'next/server'

import { fetchEncountersMap } from '../../../lib/data-encounters'
import { UIEnrichedEncounter } from '../../../types/encounters'

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const encounters: UIEnrichedEncounter[] = await fetchEncountersMap(req)

    return NextResponse.json(encounters)
  } catch (err) {
    console.error('Failed to fetch encounters', err)
    return NextResponse.json(
      { error: 'Failed to fetch encounters' },
      { status: 500 }
    )
  }
}
