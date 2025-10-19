import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Target, CheckCircle2, Star, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">SportBot AI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#sobre" className="text-gray-600 hover:text-blue-600 transition">Sobre</a>
            <a href="#taxa" className="text-gray-600 hover:text-blue-600 transition">Acertividade</a>
            <a href="#depoimentos" className="text-gray-600 hover:text-blue-600 transition">Depoimentos</a>
            <a href="#plano" className="text-gray-600 hover:text-blue-600 transition">Plano</a>
          </nav>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Acessar Painel</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-blue-600 text-white">Conectado à API-Football</Badge>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          O Bot de Análise Esportiva<br />
          <span className="text-blue-600">Mais Preciso do Mercado</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Conectado à API-Football, com taxa de acerto superior a 85%. Análises em tempo real, 
          inteligência estatística e estratégias personalizadas.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6">
              <Zap className="mr-2 h-5 w-5" />
              Acessar Painel
            </Button>
          </Link>
          <Link href="#plano">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Assinar Agora
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="border-2 hover:border-blue-600 transition">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-600 mb-2" />
              <CardTitle>Precisão</CardTitle>
              <CardDescription>Taxa de acerto superior a 85%</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-blue-600 transition">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Tempo Real</CardTitle>
              <CardDescription>Análises automáticas e instantâneas</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-blue-600 transition">
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-600 mb-2" />
              <CardTitle>Confiável</CardTitle>
              <CardDescription>Dados diretos da API-Football</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section id="sobre" className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Como Funciona o Bot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Conexão com API-Football</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Acesso direto aos dados mais atualizados de jogos, estatísticas e odds de todo o mundo.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Análise Inteligente</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Algoritmos avançados processam milhares de dados para identificar as melhores oportunidades.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Estratégias Personalizadas</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Configure suas preferências e o bot trabalha com base nas suas estratégias específicas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Resultados em Tempo Real</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Acompanhe suas análises e resultados diretamente no painel interativo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <CardHeader>
                  <CardTitle className="text-4xl">500+</CardTitle>
                  <CardDescription className="text-blue-100">Ligas Cobertas</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
                <CardHeader>
                  <CardTitle className="text-4xl">24/7</CardTitle>
                  <CardDescription className="text-green-100">Análises Automáticas</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
                <CardHeader>
                  <CardTitle className="text-4xl">1000+</CardTitle>
                  <CardDescription className="text-purple-100">Jogos por Dia</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
                <CardHeader>
                  <CardTitle className="text-4xl">∞</CardTitle>
                  <CardDescription className="text-orange-100">Dados Processados</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="taxa" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Taxa de Acertividade
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-green-600">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="#16a34a"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 88 * 0.87} ${2 * Math.PI * 88}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-green-600">87%</div>
                        <div className="text-sm text-gray-600">Acertos</div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-3xl mb-2">Performance Comprovada</CardTitle>
                <CardDescription className="text-lg">
                  Baseado em mais de 10.000 análises realizadas nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-gray-600">Acertos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">13%</div>
                    <div className="text-sm text-gray-600">Erros</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">10k+</div>
                    <div className="text-sm text-gray-600">Análises</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    RC
                  </div>
                  <div>
                    <CardTitle className="text-lg">Ricardo Costa</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  "Uso o SportBot há 3 meses e minha taxa de acerto aumentou drasticamente. 
                  A precisão das análises é impressionante e o painel é muito intuitivo."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  +340% de lucro
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                    MS
                  </div>
                  <div>
                    <CardTitle className="text-lg">Marina Silva</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  "Finalmente encontrei uma ferramenta confiável. As estratégias personalizadas 
                  fazem toda a diferença. Recomendo para qualquer pessoa séria com análises."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  89% de acertos
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                    PA
                  </div>
                  <div>
                    <CardTitle className="text-lg">Pedro Almeida</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  "A conexão com a API-Football garante dados precisos e atualizados. 
                  O suporte é excelente e o investimento vale muito a pena."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ROI de 450%
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="plano" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Plano Premium
          </h2>
          <div className="max-w-lg mx-auto">
            <Card className="border-4 border-blue-600 shadow-2xl">
              <CardHeader className="text-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-t-lg">
                <Badge className="mb-4 bg-yellow-400 text-yellow-900">Mais Popular</Badge>
                <CardTitle className="text-3xl mb-2">Plano Premium</CardTitle>
                <div className="text-5xl font-bold mb-2">R$ 97<span className="text-2xl">/mês</span></div>
                <CardDescription className="text-blue-100">
                  Acesso completo a todas as funcionalidades
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Análises ilimitadas em tempo real</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Acesso a todas as ligas e competições</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Estratégias 100% personalizadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Dashboard completo com estatísticas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Suporte prioritário via chat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Atualizações automáticas do bot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Relatórios detalhados de performance</span>
                  </li>
                </ul>
                <Button className="w-full text-lg py-6" size="lg">
                  Assinar Agora
                </Button>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Cancele quando quiser. Sem taxas ocultas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">SportBot AI</span>
              </div>
              <p className="text-gray-400">
                A plataforma mais precisa de análises esportivas do mercado.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#sobre" className="hover:text-white transition">Como Funciona</a></li>
                <li><a href="#taxa" className="hover:text-white transition">Acertividade</a></li>
                <li><a href="#plano" className="hover:text-white transition">Preços</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Política de Reembolso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SportBot AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
