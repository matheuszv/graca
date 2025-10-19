import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth';

export async function POST(req: Request) {
  const user = await getAuthUser()
  if(!user) return NextResponse.json({message: 'realize o login'}, { status: 400 });
  
  const dados = await req.json();

  try {

  const favoritosCadastrados = await prisma.favoritos.findFirst({
    where: {
      AND: [
        {idPonto: dados.idPonto},
        {user: user?.userId.toString()} 
      ]
    }
  })

  if(favoritosCadastrados){
    return NextResponse.json({ status: 200 })
  }
  
  const result = await prisma.favoritos.create({
    data: {...dados, user: user?.userId.toString()},
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
  
  const result = await prisma.favoritos.deleteMany({
    where: {
      AND:[
        {user: user.userId.toString()},
        {idPonto: dados.idPonto}
      ]
    }
  })

  return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    return NextResponse.json(error, { status: 500 });
  }
}
