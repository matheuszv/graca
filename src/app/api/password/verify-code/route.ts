import  prisma  from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, codigo } = await req.json()

  if (!email || !codigo) {
    return NextResponse.json({ error: 'Email e código obrigatórios' }, { status: 400 })
  }

  const reset = await prisma.passwordResetCode.findFirst({ where: { email } })

  if (!reset) {
    return NextResponse.json({ error: 'Código inválido' }, { status: 400 })
  }

  const now = new Date()

  if (reset.expiresAt < now) {
    return NextResponse.json({ error: 'Código expirado' }, { status: 400 })
  }

  if (reset.attempts >= 5) {
    return NextResponse.json({ error: 'Limite de tentativas excedido' }, { status: 403 })
  }

  if (reset.code !== codigo) {
    await prisma.passwordResetCode.update({
      where: { id: reset.id },
      data: { attempts: { increment: 1 } }
    })
    return NextResponse.json({ error: 'Código incorreto' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
