// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Define o formato do token
interface JwtPayload {
  userId: number
  email: string
}

export async function GET(req: NextRequest) {
  // 1. Tenta pegar o cookie chamado 'token'
  const token = req.cookies.get('token')?.value

  // 2. Se não tem cookie, retorna erro
  if (!token) {
    return NextResponse.json(
      { error: 'Não autenticado' }, 
      { status: 401 }
    )
  }

  // 3. Tenta verificar se o token é válido
  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as JwtPayload
    
    // 4. Se chegou aqui, o token é válido!
    return NextResponse.json({ 
      authenticated: true,
      userId: decoded.userId,
      email: decoded.email 
    })
    
  } catch (error) {
    console.log(error)
    // 5. Se deu erro, o token é inválido (expirado ou adulterado)
    return NextResponse.json(
      { error: 'Token inválido' }, 
      { status: 401 }
    )
  }
}