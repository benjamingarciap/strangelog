import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import type { JWT } from 'next-auth/jwt'
import type { Account, Profile, Session, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt' as const,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )
        if (!isValid) return null

        return {
          id: user.id.toString()!, // convert number → string to satisfy NextAuth
          email: user.email!,
          name: user.username!,
          image: user.avatarUrl || undefined,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT
      user?: User | AdapterUser
      account: Account | null
      profile?: Profile | undefined
      trigger?: 'signIn' | 'signUp' | 'update'
      isNewUser?: boolean
      session?: Session
    }): Promise<JWT> {
      if (user) {
        token.id = user.id.toString()
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      } // store id in JWT at sign-in
      // console.log('JWT callback token:', token)
      return token
    },
    async session({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }): Promise<Session> {
      if (token.id) {
        session.user.id = token.id.toString() // attach id to session
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
} // Type assertion to ensure it matches AuthOptions type
