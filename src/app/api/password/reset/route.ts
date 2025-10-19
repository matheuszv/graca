import  prisma  from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, codigo, novaSenha } = await req.json()

  if (!email || !codigo || !novaSenha) {
    return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 })
  }

  const reset = await prisma.passwordResetCode.findFirst({ where: { email } })

  if (!reset || reset.code !== codigo || reset.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Código inválido ou expirado' }, { status: 400 })
  }

  // Atualizar a senha do usuário
  const hashedPassword = await hash(novaSenha, 10)
  await prisma.users.updateMany({
    where: { email },
    data: { senha: hashedPassword }
  })

  // Remover o código usado
  await prisma.passwordResetCode.delete({ where: { id: reset.id } })

  return NextResponse.json({ success: true })
}
