import { NextResponse } from 'next/server'
// import { createEncounter } from '../../../lib/actions'
import {
  fetchEncounters,
  // fetchEncountersPaginated,
} from '../../../lib/data-encounters'
// import { EncounterCategory, Prisma } from '../../../generated/prisma'
// import {
//   EnrichedEncounter,
//   UIEnrichedEncounter,
//   UIEvidenceTag,
// } from '../../../types/encounters'
// import prisma from '../../../../lib/prisma'

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
