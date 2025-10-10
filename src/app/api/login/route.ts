import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const { email, password } = await req.json()

    const user = await prisma.users.findFirst({
            where: {
            email: email,
        },
    })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 401 })
  }

  const passwordOk = await bcrypt.compare(password, user.senha)
  if (!passwordOk) {
    return NextResponse.json({ error: 'Senha inválida' }, { status: 401 })
  }

  // Gera JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  const response = NextResponse.json({ message: 'Login realizado' })
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  return response
}
