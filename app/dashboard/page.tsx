"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, TrendingDown, Target, Settings, LogOut, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface UserData {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  subscription: {
    status: string;
    endDate: string | null;
  } | null;
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me");
      
      if (!response.ok) {
        router.push("/login");
        return;
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer logout",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  const performanceData = [
    { name: "Seg", acertos: 12, erros: 2 },
    { name: "Ter", acertos: 15, erros: 3 },
    { name: "Qua", acertos: 18, erros: 2 },
    { name: "Qui", acertos: 14, erros: 4 },
    { name: "Sex", acertos: 16, erros: 2 },
    { name: "Sáb", acertos: 20, erros: 3 },
    { name: "Dom", acertos: 19, erros: 1 },
  ];

  const pieData = [
    { name: "Acertos", value: 87, color: "#16a34a" },
    { name: "Erros", value: 13, color: "#dc2626" },
  ];

  const recentAnalyses = [
    { id: 1, match: "Real Madrid vs Barcelona", prediction: "Over 2.5", odds: 1.85, result: "WIN", profit: 85 },
    { id: 2, match: "Liverpool vs Chelsea", prediction: "Home Win", odds: 2.10, result: "WIN", profit: 110 },
    { id: 3, match: "PSG vs Lyon", prediction: "BTTS Yes", odds: 1.75, result: "LOSS", profit: -100 },
    { id: 4, match: "Bayern vs Dortmund", prediction: "Over 3.5", odds: 2.20, result: "WIN", profit: 120 },
    { id: 5, match: "Man City vs Arsenal", prediction: "Draw", odds: 3.50, result: "WIN", profit: 250 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">SportBot AI</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{userData?.user.name}</p>
              <Badge variant={userData?.subscription?.status === "ACTIVE" ? "default" : "secondary"}>
                {userData?.subscription?.status || "PENDING"}
              </Badge>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe suas estatísticas e configure suas estratégias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Taxa de Acertos</CardDescription>
              <CardTitle className="text-3xl text-green-600">87%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Taxa de Erros</CardDescription>
              <CardTitle className="text-3xl text-red-600">13%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                -5% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total de Análises</CardDescription>
              <CardTitle className="text-3xl">1,247</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-blue-600">
                <Activity className="h-4 w-4 mr-1" />
                Este mês
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Lucro Total</CardDescription>
              <CardTitle className="text-3xl text-green-600">R$ 8,450</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                ROI: 340%
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="strategies">Estratégias</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Semanal</CardTitle>
                  <CardDescription>Acertos vs Erros nos últimos 7 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="acertos" fill="#16a34a" name="Acertos" />
                      <Bar dataKey="erros" fill="#dc2626" name="Erros" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Resultados</CardTitle>
                  <CardDescription>Percentual de acertos e erros</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Últimas Análises</CardTitle>
                <CardDescription>Histórico recente de previsões do bot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Partida</th>
                        <th className="text-left py-3 px-4">Previsão</th>
                        <th className="text-left py-3 px-4">Odds</th>
                        <th className="text-left py-3 px-4">Resultado</th>
                        <th className="text-left py-3 px-4">Lucro/Perda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentAnalyses.map((analysis) => (
                        <tr key={analysis.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-4">{analysis.match}</td>
                          <td className="py-3 px-4">{analysis.prediction}</td>
                          <td className="py-3 px-4">{analysis.odds.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <Badge variant={analysis.result === "WIN" ? "default" : "destructive"}>
                              {analysis.result}
                            </Badge>
                          </td>
                          <td className={`py-3 px-4 font-semibold ${analysis.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                            {analysis.profit > 0 ? "+" : ""}R$ {analysis.profit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies">
            <Card>
              <CardHeader>
                <CardTitle>Configurar Estratégia</CardTitle>
                <CardDescription>
                  Defina suas preferências para que o bot analise jogos de acordo com sua estratégia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ligas Preferidas</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Premier League</option>
                      <option>La Liga</option>
                      <option>Bundesliga</option>
                      <option>Serie A</option>
                      <option>Ligue 1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Aposta</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Over/Under</option>
                      <option>Resultado Final</option>
                      <option>BTTS</option>
                      <option>Handicap</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Odds Mínima</label>
                    <input type="number" step="0.1" placeholder="1.5" className="w-full border rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Odds Máxima</label>
                    <input type="number" step="0.1" placeholder="3.0" className="w-full border rounded-md p-2" />
                  </div>
                </div>
                <Button className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Salvar Estratégia
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico Completo</CardTitle>
                <CardDescription>Todas as análises realizadas pelo bot</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Aqui será exibido o histórico completo de todas as suas análises...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Conta</CardTitle>
                <CardDescription>Gerencie sua conta e assinatura</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Status da Assinatura</h3>
                  <Badge variant={userData?.subscription?.status === "ACTIVE" ? "default" : "secondary"} className="text-lg px-4 py-2">
                    {userData?.subscription?.status || "PENDING"}
                  </Badge>
                  {userData?.subscription?.status === "PENDING" && (
                    <div className="mt-4">
                      <Button>Ativar Assinatura - R$ 97/mês</Button>
                    </div>
                  )}
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Informações da Conta</h3>
                  <p className="text-sm text-gray-600">Email: {userData?.user.email}</p>
                  <p className="text-sm text-gray-600">Nome: {userData?.user.name}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
