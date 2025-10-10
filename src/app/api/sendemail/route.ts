import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    if (req.method !== "POST") {
        return NextResponse.json({ error: "Método não permitido" }, {status: 400});
    }

    const { email } = await req.json();
    if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "E-mail inválido" }, {status: 400});
    }

    const emailsUser = await prisma.users.findFirst({where: {email: email}})
    if(emailsUser){
        return NextResponse.json({ error: "E-mail já existente" }, {status: 400});
    }
    // Gera código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();

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

    await prisma.codeSession.create({
        data: {
            email: email,
            codigo: code,
            date: new Date()
        }
    })

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Mensagem enviada com sucesso!" }, { status: 200 });
      } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return NextResponse.json({ message: JSON.stringify(error) }, { status: 500 });
    }
  
}
