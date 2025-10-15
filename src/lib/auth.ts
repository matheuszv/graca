// lib/auth.ts
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  name: string
  userId: number
  email: string
}

export async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    return decoded
  } catch (error) {
    console.log(error)
    return null
  }
}