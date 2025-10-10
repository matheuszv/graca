/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import ResendCodeButton from "@/components/buttonResend";

export default function CadastroPasso1() {
  const router = useRouter()
  const [passo, setPassos] = useState(1)
  const [code, setCode] = useState("")
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    confirmsenha: ""
  });

  const fetchSendEmail = async () =>{
    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (res.ok){
        setPassos(passo+1)
      } else {
        const error = await res.json()
        alert(error.error || 'Erro ao cadastrar')
      }

    } catch (err: any) {
      console.log(err)
    }
  
  }

  const fetchRegister = async () =>{
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, code}),
      })

      if (res.ok) {
        router.push('/login')
      } else {
        const error = await res.json()
        alert(error.error || 'Erro ao cadastrar')
      }
    } catch (err) {
      console.error('Erro no fetch:', err)
      alert('Erro inesperado')
    }
  }

  const truncateEmail = (email: string) => {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;

  if (user.length <= 4) return `${user[0]}•••@${domain}`;
  
  const first = user.slice(0, 2);
  const last = user.slice(-1);
  return `${first}•••${last}@${domain}`;
}

  const formatCPF = (value: string) => {
    let newValue = value.replace(/\D/g, ""); // remove tudo que não é número
    if (newValue.length > 11) newValue = newValue.slice(0, 11); // limita a 11 dígitos
    newValue = newValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // aplica a máscara
    return newValue;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cpf") {
      newValue = formatCPF(value);
    }
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    if(passo<3){
      if(passo==2){
        await fetchSendEmail()
      } else {
        setPassos(passo+1)
      }
    }
    else {
      fetchRegister()
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-transparent px-4 py-4 gap-2 h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-white text-2xl font-semibold px-3 py-1">
          Bem-vindo ao <span className="font-bold">GRAÇA!</span>
        </h1>
        <p className="text-gray-400 px-3 py-1">
          Precisamos de algumas informações para que você possa criar pontos de apoio.
        </p>

        {/* Barra de progresso */}
        <div className="w-full px-3 py-2">
          <div className="flex justify-between text-gray-400 text-sm mb-2">
            <span>Passo {passo} de 3</span>
          </div>
          <div className="w-full h-1 rounded flex gap-2">
            <div className={`h-1 bg-white rounded w-1/3`}></div>
            <div className={`h-1 ${passo>1 ? 'bg-white' : 'bg-gray-700'} rounded w-1/3`}></div>
            <div className={`h-1 ${passo>2 ? 'bg-white' : 'bg-gray-700'} rounded w-1/3`}></div>
          </div>
        </div>

        <Card className="bg-[#121214] border-none">
          <CardContent className="px-6 py-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              {passo==1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome" className="text-gray-300 mb-2 block">
                      Nome Completo
                    </Label>
                    <Input
                      id="nome"
                      required
                      name="nome"
                      placeholder="Joseph Oliveira"
                      value={formData.nome}
                      onChange={handleChange}
                      className="!bg-[#0a0a0a] border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpf" className="text-gray-300 mb-1 block">
                      CPF
                    </Label>
                    <Input
                      required
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleChange}
                      className="!bg-[#0a0a0a] border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone" className="text-gray-300 mb-1 block">
                      TELEFONE
                    </Label>
                    <Input
                      id="telefone"
                      required
                      name="telefone"
                      placeholder="(83) 99999-9999"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="!bg-[#0a0a0a] border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300 mb-1 block">
                      E-MAIL
                    </Label>
                    <Input
                      id="email"
                      required
                      name="email"
                      type="email"
                      placeholder="Joseph@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="!bg-[#0a0a0a] border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
              )}
              {passo==2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome" className="text-gray-300 mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      disabled
                      name="email"
                      placeholder=""
                      value={formData.email}
                      onChange={handleChange}
                      className="!bg-[#0a0a0a] border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="senha" className="text-gray-300 mb-1 block">
                      Senha
                    </Label>
                    <Input
                      id="senha"
                      required
                      name="senha"
                      type="password"
                      value={formData.senha}
                      onChange={handleChange}
                      className="!bg-[#0a0a0a] border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmsenha" className="text-gray-300 mb-1 block">
                      Confirme a senha
                    </Label>
                    <Input
                      id="confirmsenha"
                      required
                      name="confirmsenha"
                      type="password"
                      value={formData.confirmsenha}
                      onChange={handleChange}
                      className="!bg-[#0a0a0a] border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
              )}

              {passo==3 && (
                <div className="space-y-3">
                <CardHeader >
                  <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
                    Confirme sua identidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-foreground">
                    Confira seu e-mail <strong className="font-semibold"> {truncateEmail(formData.email)} </strong>e insira o código de verificação abaixo.
                  </CardDescription>
                  <div className="flex justify-center my-6">
                    <InputOTP 
                      maxLength={6} 
                      pattern={REGEXP_ONLY_DIGITS}
                      value={code}
                      onChange={(value) => setCode(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="flex flex-col gap-3 pt-2 pb-8 border-b border-gray-700">
                    <span className="flex justify-center text-sm font-thin">Lembre-se de verificar a caixa de spam</span>
                    <ResendCodeButton initialMinutes={5} onResend={fetchSendEmail} />
                  </div>
                </CardContent>
              </div>
              )}
              


              <div className="flex w-full gap-2">
                {passo==2 && (
                    <Button
                      type="button"
                      onClick={() => setPassos(passo-1)}
                      className="bg-[#3A3A3A] hover:bg-[#4a4a4a] text-white font-medium py-2 rounded flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft size={18} /> Anterior 
                    </Button>
                  )
                }
                
                <Button
                  type="submit"
                  disabled={passo==1 ? (formData.cpf=="" || formData.nome=="" || formData.email=="" || formData.telefone=="" ) : (formData.senha=="" || formData.confirmsenha=="" || formData.senha!=formData.confirmsenha)}
                  className="flex-1 bg-[#00875F] hover:bg-[#00B37E] text-white font-medium py-2 rounded flex items-center justify-center gap-1 cursor-pointer"
                >
                  {passo==3 ? 'Finalizar Cadastro' : 'Próximo passo'} <ArrowRight size={18} />
                </Button>
              </div>
              
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}