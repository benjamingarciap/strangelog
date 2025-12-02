import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(): Promise<Response> {
  console.log('GET /api/auth/me called')
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ error: 'User not logged in' }), {
        status: 401,
      })
    }
    // console.log('Session found:', session.user)
    const response = new Response(JSON.stringify({ user: session.user }), {
      status: 200,
    })
    console.log('Authenticated response:', response)
    return response
    //==============================
  } catch (error) {
    return new Response(`Internal Server Error: ${error}`, { status: 500 })
  }
}
