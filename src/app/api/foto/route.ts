import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import jwt from 'jsonwebtoken'

export async function PUT(req: Request) {
  const user = await getAuthUser()
  if(!user) return NextResponse.json({message: 'realize o login'}, { status: 400 });

    try {
    const { urlFoto } = await req.json()

      const result = await prisma.users.update({
        data: {
          fotoPerfil: urlFoto,
        },
        where: {id: (user.userId).toString() },
      })

      // Gera JWT
        const token = jwt.sign(
          { userId: user.userId, email: user.email, name: user.name, fotoPerfil: result.fotoPerfil },
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

    } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 })
  }
}