import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth';

export async function POST(req: Request) {
  const user = await getAuthUser()
  if(!user) return NextResponse.json({message: 'realize o login'}, { status: 400 });
  
  const dados = await req.json();
  const data = {...dados, coordenada: dados.coordenada.join(","), status: false, criadorId: user?.userId}

  try {
  const result = await prisma.pontos.create({
    data
  })

  return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getAuthUser()
  if(!user) return NextResponse.json({message: 'realize o login'}, { status: 400 });
  const dados = await req.json();
  const id = dados.id;
  delete dados.id;
  try {
    await prisma.comentarios.deleteMany({
      where: { pontoId: dados.id }
    });

  const result = await prisma.pontos.updateMany({
    data: {...dados, coordenada: dados.coordenada.join(","), criadorId: user?.userId},
    where: {
      AND: [
        {id: id },
        {criadorId: (user?.userId).toString()}
      ]
      
    }
  })

  return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    return NextResponse.json(error, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  const user = await getAuthUser()
  if(!user) return NextResponse.json({message: 'realize o login'}, { status: 400 });
  
  const dados = await req.json();
  try {

  const result = await prisma.pontos.deleteMany({
    where: {
      AND: [
        { id: dados.id },
        { criadorId: user.userId.toString() },
      ],
    },
  })

  return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    return NextResponse.json(error, { status: 500 });
  }
}