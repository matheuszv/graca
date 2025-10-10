'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      alert('Login realizado com sucesso!')
      router.push('/pontos')
    } else {
      const data = await res.json()
      alert(data.error || 'Erro no login')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="border-border bg-card backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
              Realize seu login
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Entre com suas credenciais para continuar
            </p>
          </CardHeader>
          <CardContent className="px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring transition-all"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all hover:shadow-lg cursor-pointer"
              >
                Entrar
              </Button>
              <Button type="button" className="justify-center cursor-pointer w-full" variant={"link"}>Esqueceu sua senha?</Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <a href="/cadastro" className="text-foreground hover:underline font-medium">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  )
}
