import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

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

    return NextResponse.json(result , { status: 200 })
    } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 })
  }
}