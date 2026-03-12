'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      toast.success('Login realizado com sucesso!')
      router.push('/pontos')
    } else {
      const data = await res.json()
      toast.error(data.error || 'Erro no login')  
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">

          {/* TRIÂNGULOS VIVOS E SOLTOS (Onde a arte acontece) */}
          <svg className="absolute top-0 right-0 w-1/2 h-full opacity-20" viewBox="0 0 400 800" fill="none">
            {/* Triângulo Turquesa */}
            <path d="M450 100L250 350L550 400Z" fill="#2dd4bf" />
            {/* Triângulo Amarelo */}
            <path d="M300 500L100 700L400 750Z" fill="#facc15" />
            {/* Triângulo Azul */}
            <path d="M500 600L350 780L600 850Z" fill="#3b82f6" />
          </svg>
      </div>
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
                disabled={isLoading}
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all hover:shadow-lg cursor-pointer"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
              <Button type="button" className="justify-center cursor-pointer w-full" variant={"link"} onClick={()=>router.push('/recuperar')}>Esqueceu sua senha?</Button>
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
