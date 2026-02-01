/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'


export default function RecuperarSenhaPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [loading, setLoading] = useState(false)

  async function enviarCodigo() {
    setLoading(true)
    try {
      const res = await fetch('/api/password/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!res.ok) throw await res.json()

      toast.info('Se o e-mail existir, um código foi enviado.')
      setStep(2)
    } catch (err: any) {
      toast.error(err?.error || 'Erro ao enviar código.')
    } finally {
      setLoading(false)
    }
  }

  async function verificarCodigo() {
    setLoading(true)
    try {
      const res = await fetch('/api/password/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo })
      })

      if (!res.ok) throw await res.json()

      setStep(3)
    } catch (err: any) {
      toast.error(err?.error || 'Código inválido.')
    } finally {
      setLoading(false)
    }
  }

  async function redefinirSenha() {
    setLoading(true)
    try {
      const res = await fetch('/api/password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo, novaSenha })
      })

      if (!res.ok) throw await res.json()

      toast.success('Senha redefinida com sucesso!')
      window.location.href = '/login'
    } catch (err: any) {
      toast.error(err?.error || 'Erro ao redefinir senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="border-border bg-card backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
              Recuperar Senha
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 px-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" disabled={loading || !email} onClick={enviarCodigo}>
                  {loading ? 'Enviando...' : 'Enviar código'}
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código recebido por e-mail</Label>
                  <Input
                    id="codigo"
                    type="text"
                    placeholder="Ex: 123456"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" disabled={loading || !codigo} onClick={verificarCodigo}>
                  {loading ? 'Verificando...' : 'Verificar código'}
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="novaSenha">Nova senha</Label>
                  <Input
                    id="novaSenha"
                    type="password"
                    placeholder="Nova senha segura"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" disabled={loading || !novaSenha} onClick={redefinirSenha}>
                  {loading ? 'Salvando...' : 'Redefinir senha'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Lembrou sua senha?{' '}
          <a href="/login" className="text-primary hover:underline font-medium">
            Fazer login
          </a>
        </p>
      </div>
    </div>
  )
}
