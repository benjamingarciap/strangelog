// app/api/encounters/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '../../../app/generated/prisma/index.js'

const prisma = new PrismaClient()

export async function GET(): Promise<NextResponse> {
  try {
    const encounters = await prisma.encounter.findMany({
      include: {
        creator: true, // includes User
        comments: {
          include: {
            author: true, // comment author
            replies: {
              include: {
                author: true, // replies' authors
              },
            },
          },
        },
        reactions: true, // includes all reactions
        confidences: true, // includes all confidence votes
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(encounters)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to fetch encounters' },
      { status: 500 }
    )
  }
}
