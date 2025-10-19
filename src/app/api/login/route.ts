import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

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
    { userId: user.id, email: user.email, name: user.nome, fotoPerfil: user.fotoPerfil },
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


export async function PUT(req: Request) {
  const user = await getAuthUser()
  if(!user) return NextResponse.json({message: 'realize o login'}, { status: 400 });

    try {
      
      const senhantiga = await prisma.users.findUnique({
        select:{
          senha: true,
        },
        where: {id: (user.userId).toString()}
      })

      let dado = await req.json()

      if(dado.senha){
        const isEquals = await bcrypt.compare(dado.senhaAntiga, senhantiga?.senha ? senhantiga?.senha : '')
        if(isEquals){
          dado = {...dado, senha: bcrypt.hashSync(dado.senha, 10)}
          delete dado.senhaAntiga
        } else {
          return NextResponse.json({ error: 'Preencha corretamente com sua senha antiga' }, { status: 500 })
        }
      }
      

      const result = await prisma.users.update({
        data: {
          ...dado
        },
        where: {id: (user.userId).toString() },
      })

    return NextResponse.json(result , { status: 200 })
    } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 })
  }
}


export async function DELETE() {
  console.log('logout')
  const response = NextResponse.json({ message: 'Logout realizado' })
  response.cookies.delete('token')
  return response
}