import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Target, CheckCircle2, Star, Shield, Zap, Activity, BarChart, Brain, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <header className="border-b border-blue-900/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Trophy className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <div className="absolute inset-0 blur-xl bg-emerald-400/20 group-hover:bg-emerald-400/30 transition-all"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              FutProBot
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <a href="#sobre" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">Sobre</a>
            <a href="#taxa" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">Performance</a>
            <a href="#depoimentos" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">Depoimentos</a>
            <a href="#plano" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">Planos</a>
          </nav>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-blue-900/50">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg shadow-emerald-500/20">
                Acessar Painel
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 text-sm font-semibold">
            <Activity className="w-3 h-3 mr-2 inline" />
            Conectado à API-Football em Tempo Real
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="text-white">Análise de Futebol</span><br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              Movida por IA
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Previsões precisas com <span className="text-emerald-400 font-bold">taxa de acerto de 87%</span>. 
            Algoritmos avançados analisam milhares de dados para identificar as melhores oportunidades.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap mb-16">
            <Link href="/register">
              <Button size="lg" className="text-lg px-10 py-7 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl shadow-emerald-500/30 font-bold">
                <Zap className="mr-2 h-5 w-5" />
                Começar Agora Grátis
              </Button>
            </Link>
            <Link href="#plano">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500">
                Ver Planos
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                  <Target className="h-8 w-8 text-emerald-400" />
                </div>
                <CardTitle className="text-white text-xl">Alta Precisão</CardTitle>
                <CardDescription className="text-gray-400">87% de taxa de acerto comprovada</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl">Inteligência Artificial</CardTitle>
                <CardDescription className="text-gray-400">Algoritmos avançados de ML</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
                <CardTitle className="text-white text-xl">100% Confiável</CardTitle>
                <CardDescription className="text-gray-400">Dados oficiais API-Football</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-gradient-to-b from-slate-900/50 to-transparent py-24 border-y border-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border border-blue-500/30">Como Funciona</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tecnologia de Ponta para Análises Precisas
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Nossa plataforma combina IA, Big Data e expertise em futebol
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">Coleta de Dados</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Conexão direta com API-Football para capturar dados em tempo real de milhares de jogos, 
                    estatísticas detalhadas e odds atualizadas.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">Análise Inteligente</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Algoritmos de Machine Learning processam milhões de dados históricos para 
                    identificar padrões e tendências vencedoras.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">Estratégias Personalizadas</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Configure suas preferências de ligas, odds e tipos de análise. 
                    O bot trabalha 24/7 seguindo sua estratégia.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">Resultados Comprovados</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Acompanhe todas as análises, resultados e performance no dashboard interativo com gráficos em tempo real.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-emerald-600 to-green-700 border-none shadow-2xl shadow-emerald-500/20 hover:scale-105 transition-transform">
                <CardHeader className="text-center">
                  <div className="text-5xl font-black text-white mb-2">500+</div>
                  <CardDescription className="text-emerald-100 font-semibold">Ligas Cobertas</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-600 to-cyan-700 border-none shadow-2xl shadow-blue-500/20 hover:scale-105 transition-transform">
                <CardHeader className="text-center">
                  <div className="text-5xl font-black text-white mb-2">24/7</div>
                  <CardDescription className="text-blue-100 font-semibold">Análises Ativas</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-600 to-pink-700 border-none shadow-2xl shadow-purple-500/20 hover:scale-105 transition-transform">
                <CardHeader className="text-center">
                  <div className="text-5xl font-black text-white mb-2">1000+</div>
                  <CardDescription className="text-purple-100 font-semibold">Jogos/Dia</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-600 to-red-700 border-none shadow-2xl shadow-orange-500/20 hover:scale-105 transition-transform">
                <CardHeader className="text-center">
                  <div className="text-5xl font-black text-white mb-2">∞</div>
                  <CardDescription className="text-orange-100 font-semibold">Dados Processados</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="taxa" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Performance</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Taxa de Acertividade Comprovada
            </h2>
            <p className="text-gray-400 text-lg">Baseado em mais de 10.000 análises nos últimos 6 meses</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/10 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-8">
                  <div className="relative w-64 h-64">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="110"
                        stroke="#1e293b"
                        strokeWidth="16"
                        fill="none"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="110"
                        stroke="url(#gradient)"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 110 * 0.87} ${2 * Math.PI * 110}`}
                        className="transition-all duration-1000"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-7xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">87%</div>
                        <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Taxa de Acerto</div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-3xl mb-4 text-white">Performance Excepcional</CardTitle>
                <CardDescription className="text-lg text-gray-400">
                  Precisão validada por milhares de análises reais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">87%</div>
                    <div className="text-sm text-gray-400 font-medium">Acertos</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
                    <div className="text-4xl font-bold text-red-400 mb-2">13%</div>
                    <div className="text-sm text-gray-400 font-medium">Erros</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <div className="text-4xl font-bold text-blue-400 mb-2">10k+</div>
                    <div className="text-sm text-gray-400 font-medium">Análises</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="bg-gradient-to-b from-slate-900/50 to-transparent py-24 border-y border-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border border-purple-500/30">Depoimentos</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              O Que Nossos Usuários Dizem
            </h2>
            <p className="text-gray-400 text-lg">Resultados reais de quem usa FutProBot</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-emerald-500/20 hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/10">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    RC
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Ricardo Costa</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-300 leading-relaxed">
                  "Uso o FutProBot há 3 meses e minha taxa de acerto aumentou drasticamente. 
                  A precisão das análises é impressionante e o painel é muito intuitivo."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  +340% de lucro
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    MS
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Marina Silva</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-300 leading-relaxed">
                  "Finalmente encontrei uma ferramenta confiável. As estratégias personalizadas 
                  fazem toda a diferença. Recomendo para qualquer pessoa séria com análises."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold">
                  89% de acertos
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    PA
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Pedro Almeida</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-300 leading-relaxed">
                  "A conexão com a API-Football garante dados precisos e atualizados. 
                  O suporte é excelente e o investimento vale muito a pena."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30 font-bold">
                  ROI de 450%
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="plano" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-blue-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 border border-emerald-500/30">Planos</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-gray-400 text-lg">Acesso completo a todas as funcionalidades</p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-4 border-emerald-500/50 shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-blue-500"></div>
              <CardHeader className="text-center bg-gradient-to-br from-emerald-600 to-green-700 relative">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-400 text-yellow-900 border-none font-bold px-4 py-1.5">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    Mais Popular
                  </Badge>
                </div>
                <CardTitle className="text-3xl mb-4 text-white pt-8">Plano Premium</CardTitle>
                <div className="text-6xl font-black text-white mb-2">
                  R$ 97
                  <span className="text-2xl font-normal text-emerald-100">/mês</span>
                </div>
                <CardDescription className="text-emerald-100 text-lg font-medium">
                  Acesso ilimitado a todas as funcionalidades
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 pb-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Análises ilimitadas em tempo real</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Acesso a 500+ ligas e competições</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Estratégias 100% personalizadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Dashboard completo com gráficos avançados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Suporte prioritário via chat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Atualizações automáticas do bot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Relatórios detalhados de performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">API de integração disponível</span>
                  </li>
                </ul>
                <Button className="w-full text-lg py-7 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-xl shadow-emerald-500/30 font-bold">
                  <Zap className="mr-2 h-5 w-5" />
                  Assinar Agora
                </Button>
                <p className="text-center text-sm text-gray-400 mt-6">
                  Cancele quando quiser • Sem taxas ocultas • Garantia de 7 dias
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-blue-900/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-8 w-8 text-emerald-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  FutProBot
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                A plataforma de análise de futebol mais precisa e confiável do mercado, 
                movida por inteligência artificial.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6">Produto</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#sobre" className="hover:text-emerald-400 transition-colors">Como Funciona</a></li>
                <li><a href="#taxa" className="hover:text-emerald-400 transition-colors">Performance</a></li>
                <li><a href="#plano" className="hover:text-emerald-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6">Suporte</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Licenças</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              &copy; 2025 FutProBot. Todos os direitos reservados. | 
              <a href="https://futprobot.com" className="text-emerald-400 hover:text-emerald-300 ml-1">futprobot.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
