'use client'
import { Card } from '@/components/ui/card'
import { Heart, Users, HeartHandshakeIcon, Code, Github, Linkedin, Mail } from 'lucide-react'

export default function Creditos() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="border-border bg-[#202024] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center flex items-center flex-col px-8 py-4 rounded-lg w-[500px] max-md:w-[320px] z-[10] shadow-2xl max-md:py-2">
        
        {/* Logo/Título */}
        <div className="text-center mb-8 max-md:mb-3">
          <div className="flex items-center justify-center gap-2 mb-4 max-md:hidden">
            <HeartHandshakeIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2 max-md:text-lg">GRAÇA</h1>
          <span className="text-muted-foreground text-sm max-md:text-xs">
            Gestor de Rede de Apoio Comunitário e Assistência
          </span>
        </div>

        {/* Descrição do Sistema */}
        <Card className="w-full p-6 mb-6 bg-card max-md:mb-2">
          <div className="flex items-start gap-3 mb-4 max-md:mb-1">
            <Users className="text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2 max-md:mb-1">Sobre o Sistema</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-md:text-xs">
                O GRAÇA é um sistema que conecta pessoas e comunidades através da solidariedade. 
                Ajudamos você a encontrar pontos de doação, seja para receber ajuda ou para 
                contribuir com quem precisa.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground border-t pt-4 mt-0">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>Construindo pontes de solidariedade</span>
          </div>
        </Card>

        {/* Desenvolvedor */}
        <Card className="w-full px-6 py-3 bg-card">
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">Desenvolvimento</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-base font-medium">Matheus Vinagre</p>
                  <p className="text-sm text-muted-foreground">Desenvolvedor Full Stack</p>
                </div>
                
                {/* Links sociais (opcional) */}
                <div className="flex gap-3 pt-2">
                  <a 
                    href="https://github.com/matheuszv" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/matheuszv" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="mailto:matheus.vinagre2@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Rodapé */}
        <div className="text-center mt-4 text-xs text-muted-foreground">
          <p>© 2025 GRAÇA - Todos os direitos reservados</p>
          <p className="mt-1">Versão 1.0.0</p>
        </div>
      </div>
    </div>
  )
}