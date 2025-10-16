import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { subMinutes } from "date-fns";

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const codeTrue = await prisma.codeSession.findFirst({
      where: {
        AND: [
          {email: data.email},
          {
            date :{ gte: subMinutes(new Date(), 5)}
          }
      ]} 
    })

    if(!codeTrue || codeTrue.codigo!=data.code){
      return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 400 })
    }

    const result = await prisma.users.create({
      data: {
        nome: data.nome,
        cpf: data.cpf,
        telefone: data.telefone,
        email: data.email,
        senha: bcrypt.hashSync(data.senha, 10),
        fotoPerfil: '',
      },
    })

    return NextResponse.json({ message: 'Usuário criado com sucesso', result })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 })
  }
}
