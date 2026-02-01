import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth';

export async function POST(req: Request) {
  const user = await getAuthUser()
  if(!user) return NextResponse.json({message: 'realize o login'}, { status: 400 });
  
  const dados = await req.json();

  
    const total = await prisma.comentarios.count({
      where: {
        userId: user?.userId.toString(),
        pontoId: dados.pontoId,
      },
    })

    if(total == 3) return NextResponse.json({message: 'Limite de comentários atingido para este ponto de doação.'}, { status: 403 });
    
  try {
  const result = await prisma.comentarios.create({
    data: {...dados, userId: user?.userId, data: new Date().toLocaleString('pt-BR').replace(',', ' •').slice(0,18), createdAt: new Date()},
    include: {user: true}
  })


  return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    return NextResponse.json(error, { status: 500 });
  }
}
