import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { email, username, password, firstName, lastName } = body
    if (!email || !username || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        {
          error: 'Email already registered',
        },
        { status: 400 }
      )
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        passwordHash,
        avatarUrl: '',
        confidenceLevel: 2,
      },
    })
    return NextResponse.json({
      message: `New user created with ID: ${newUser.id}`,
    })
  } catch (error) {
    console.log('Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
