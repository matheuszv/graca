import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email obrigatório' }, { status: 400 })
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

  // Opcional: deletar códigos antigos do mesmo email
  await prisma.passwordResetCode.deleteMany({ where: { email } })

  // Salvar novo código
  await prisma.passwordResetCode.create({
    data: { email, code, expiresAt }
  })

  // Aqui você deveria enviar o email com o código
  try{
    const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
      });
  
      const mailOptions = {
        from: `"Verificação" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Seu código de verificação",
        text: `Seu código de verificação é: ${code}`,
        html: `<p>Seu código de verificação é:</p><h2>${code}</h2>`,
        
      }

      await transporter.sendMail(mailOptions);

       return NextResponse.json({ message: 'Se o email existir, enviaremos um código.' },{status: 200})
  } catch {
       return NextResponse.json({ message: 'Email inexistente' },{status: 404})
  }
 
}
