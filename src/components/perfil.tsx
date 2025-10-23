/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, KeyRound, Lock, Phone, User } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


export default function EditProfileForm({ userData }: {userData: any}) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [senhaAntiga, setSenhaAntiga] = useState('')
  const [telefone, setTelefone] = useState(userData?.telefone || '')
  const [urlFoto, setUrlFoto] = useState(userData?.fotoPerfil || '')
  const [testFoto, setTestFoto] = useState(false)
  const [modalFotoOpen, setModalFotoOpen] = useState(false)

  const handleSubmit = async () => {
    // Validação de senha
    if (senha && senha !== confirmarSenha) {
      toast.error('As senhas não coincidem!')
      return
    }

    if (senha && senha.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres')
      return
    }

    const dadosAtualizados = {
      telefone,
      ...(senha && { senha, senhaAntiga }) // Só inclui senha se foi preenchida
    }

    const result = await fetch('/api/login',{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
      })

      const data = await result.json()
      if(result.ok){
        toast.success('Dados do perfil editados com sucesso!')
        router.refresh()
      } else {
        toast.error(data.error)
      }
  }

  
  const handleFoto = async() => {
    const result = await fetch('/api/foto',{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({urlFoto})
      })
      if(result.ok){
        toast.success('Foto de perfil enviada com sucesso!')
        router.refresh()
      } else {
        toast.error('Erro ao enviar a foto de perfil!')
      }
  }

  const formatarTelefone = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '')
    
    if (apenasNumeros.length <= 10) {
      return apenasNumeros
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    }
    
    return apenasNumeros
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15)
  }

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatado = formatarTelefone(e.target.value)
    setTelefone(formatado)
  }

  // Dados de exemplo
  const currentUserData = userData
  const fotoAtual = currentUserData.fotoPerfil || ''

  return (
  <div className="max-md:gap-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 justify-center flex items-center flex-col px-4 py-8 rounded-lg h-[580px] w-[400px] max-md:w-[350px] z-[10] max-md:p-2">
      <Card className="w-full max-w-md border-border bg-card backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            {fotoAtual ? (
                <img 
                  src={fotoAtual} 
                  alt="Foto de perfil" 
                  onClick={() => setModalFotoOpen(true)}
                  className="w-full h-full object-cover hover:opacity-50 transition-all cursor-pointer rounded-full"
                />
              ) : (
                <User 
                    className="w-8 h-8 text-primary hover:opacity-50 transition-all cursor-pointer"
                    onClick={() => setModalFotoOpen(true)}    
                />
              )}
          </div>
          <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
            Editar Perfil
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6">
          {/* Informações do usuário */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg space-y-2">
            {currentUserData.nome && (
              <p className="text-xs">
                <span className="font-semibold">Nome:</span> {currentUserData.nome}
              </p>
            )}
            {currentUserData.email && (
              <p className="text-xs">
                <span className="font-semibold">Email:</span> {currentUserData.email}
              </p>
            )}
            {currentUserData.cpf && (
              <p className="text-xs">
                <span className="font-semibold">CPF:</span> {currentUserData.cpf}
              </p>
            )}
          </div>

          <div className="space-y-5">
            {/* TELEFONE */}
            <div className="space-y-2">
              <Label htmlFor="telefone" className="flex items-center gap-2 max-md:text-sm">
                <Phone className="w-3 h-3" />
                Telefone
              </Label>
              <Input
                id="telefone"
                type="tel"
                value={telefone}
                onChange={handleTelefoneChange}
                placeholder="83 99999-9999"
                inputMode='numeric'
                className="h-11 max-md:text-sm max-md:h-8"
              />
            </div>

            {/* DIVISOR */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Alterar senha (opcional)
                </span>
              </div>
            </div>

            {/* NOVA SENHA */}
            <div className="space-y-2">
              <Label htmlFor="senha" className="flex items-center gap-2 max-md:text-sm">
                <Lock className="w-3 h-3" />
                Nova Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite a nova senha"
                  className="h-11 pr-10 max-md:text-sm max-md:h-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRMAR SENHA */}
            {senha && (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="Confirme a nova senha"
                    className="h-11 pr-10 max-md:text-sm max-md:h-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <Label htmlFor="confirmarSenha" className="flex items-center gap-2 max-md:text-sm">
                  <KeyRound className="w-3 h-3" />
                  Digite sua senha antiga
                </Label>
                <Input
                    id="Sua senha antiga"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={senhaAntiga}
                    onChange={(e) => setSenhaAntiga(e.target.value)}
                    placeholder="Sua senha antiga"
                    className="h-11 pr-10 max-md:text-sm max-md:h-8"
                />

              </div>
            )}

            {/* BOTÃO */}
            <Button
              type="button"
              disabled={senha!='' ? confirmarSenha!=senha ? true : false : false}
              onClick={handleSubmit}
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all hover:shadow-lg mt-6"
            >
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Foto de Perfil */}
      <Dialog open={modalFotoOpen} onOpenChange={setModalFotoOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Alterar Foto de Perfil</DialogTitle>
            <DialogDescription>
              Cole o link da imagem que deseja usar como foto de perfil
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="urlFoto">URL da Imagem</Label>
              <div className='flex gap-2'>
              <Input
                id="urlFoto"
                type="url"
                value={urlFoto}
                onChange={(e) => (setUrlFoto(e.target.value), setTestFoto(false))}
                placeholder="https://exemplo.com/foto.jpg"
                className="h-11 flex-1"
              />
              <Button className='h-11 cursor-pointer' variant={'secondary'} onClick={() => setTestFoto(true)}>Testar</Button>
              </div>
            </div>

            {urlFoto && (
              <div className="space-y-2">
                <Label>Pré-visualização</Label>
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-border">
                {testFoto && (
                    <img 
                      src={urlFoto} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  )
                }
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setModalFotoOpen(false)
                  setUrlFoto(userData?.fotoPerfil || '')
                }}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={()=>handleFoto()}
              >
                Salvar Foto
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}