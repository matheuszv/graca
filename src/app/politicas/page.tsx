'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle, FileText, Mail } from 'lucide-react'

export default function PoliticaPrivacidade() {
  return (
    <div className="flex-1 justify-center items-center min-h-screen bg-background">
      <div className="border-border bg-[#202024] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center flex items-center flex-col px-6 py-8 rounded-lg h-[650px] w-[700px] max-md:w-[350px] max-md:h-[570px] z-[10] shadow-2xl">
        
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-8 h-8 text-primary max-md:w-6 max-md:h-6" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2 max-md:text-xl">Política de Privacidade</h1>
          <p className="text-sm text-muted-foreground">
            Última atualização: 15 de outubro de 2025
          </p>
        </div>

        {/* Conteúdo Scrollável */}
        <ScrollArea className="h-[420px] w-full px-4 max-md:h-[380px]">
          <div className="space-y-6 pr-4">
            
            {/* Introdução */}
            <section>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O GRAÇA (Gestor de Rede de Apoio Comunitário e Assistência) respeita sua privacidade 
                e está comprometido em proteger seus dados pessoais. Esta política descreve como 
                coletamos, usamos e protegemos suas informações.
              </p>
            </section>

            {/* Coleta de Dados */}
            <section>
              <div className="flex items-start gap-3 mb-3">
                <Database className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">1. Dados Coletados</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Coletamos as seguintes informações quando você utiliza nosso sistema:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Nome e informações de contato</li>
                    <li>Localização geográfica para encontrar pontos de apoio</li>
                    <li>Dados de cadastro de pontos de doação</li>
                    <li>Histórico de interações com o sistema</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Uso dos Dados */}
            <section>
              <div className="flex items-start gap-3 mb-3">
                <Eye className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">2. Como Usamos Seus Dados</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Seus dados são utilizados exclusivamente para:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Conectar você a pontos de apoio e doação</li>
                    <li>Facilitar a comunicação entre doadores e beneficiários</li>
                    <li>Melhorar a experiência do usuário</li>
                    <li>Enviar notificações relevantes sobre pontos de apoio</li>
                    <li>Manter a segurança e integridade do sistema</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Segurança */}
            <section>
              <div className="flex items-start gap-3 mb-3">
                <Lock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">3. Segurança dos Dados</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Implementamos medidas de segurança técnicas e organizacionais para proteger 
                    seus dados contra acesso não autorizado, perda, destruição ou alteração. 
                    Todos os dados são armazenados em servidores seguros com criptografia.
                  </p>
                </div>
              </div>
            </section>

            {/* Compartilhamento */}
            <section>
              <div className="flex items-start gap-3 mb-3">
                <UserCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">4. Compartilhamento de Dados</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros 
                    para fins comerciais. Informações sobre pontos de doação são compartilhadas 
                    apenas com usuários do sistema para fins de conexão e apoio comunitário.
                  </p>
                </div>
              </div>
            </section>

            {/* Direitos do Usuário */}
            <section>
              <div className="flex items-start gap-3 mb-3">
                <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">5. Seus Direitos</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem direito a:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos ou desatualizados</li>
                    <li>Solicitar a exclusão de seus dados</li>
                    <li>Revogar consentimento a qualquer momento</li>
                    <li>Solicitar portabilidade de dados</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">6. Cookies e Tecnologias</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, 
                    manter sua sessão ativa e analisar o uso do sistema. Você pode configurar 
                    seu navegador para recusar cookies, mas isso pode afetar a funcionalidade.
                  </p>
                </div>
              </div>
            </section>

            {/* Alterações */}
            <section>
              <div className="flex items-start gap-3 mb-3">
                <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">7. Alterações na Política</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Podemos atualizar esta política periodicamente. Notificaremos você sobre 
                    mudanças significativas através do sistema ou por e-mail. Recomendamos 
                    revisar esta página regularmente.
                  </p>
                </div>
              </div>
            </section>

            {/* Contato */}
            <section className="border-t pt-6 mt-6">
              <div className="flex items-start gap-3 mb-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">8. Contato</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>E-mail:</strong> matheus.vinagre2@gmail.com<br />
                    <strong>Desenvolvedor:</strong> Matheus Vinagre
                  </p>
                </div>
              </div>
            </section>

            {/* Espaçamento final */}
            <div className="h-4"></div>
          </div>
        </ScrollArea>

        {/* Rodapé */}
        <div className="text-center mt-4 pt-4 border-t w-full">
          <p className="text-xs text-muted-foreground">
            © 2025 GRAÇA - Comprometidos com sua privacidade
          </p>
        </div>
      </div>
    </div>
  )
}