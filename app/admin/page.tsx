"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, TrendingUp, Activity, LogOut, Shield, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserData {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export default function AdminPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
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
      
      if (data.user.role !== "ADMIN") {
        router.push("/dashboard");
        return;
      }

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

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      toast({
        title: "Usuário criado!",
        description: `${newUserName} foi cadastrado com sucesso.`,
      });

      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar usuário",
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

  const allUsers = [
    { id: 1, name: "Ricardo Costa", email: "ricardo@email.com", status: "ACTIVE", winRate: 89, analyses: 245 },
    { id: 2, name: "Marina Silva", email: "marina@email.com", status: "ACTIVE", winRate: 87, analyses: 198 },
    { id: 3, name: "Pedro Almeida", email: "pedro@email.com", status: "ACTIVE", winRate: 85, analyses: 312 },
    { id: 4, name: "Ana Santos", email: "ana@email.com", status: "CANCELLED", winRate: 82, analyses: 156 },
    { id: 5, name: "Carlos Ferreira", email: "carlos@email.com", status: "PENDING", winRate: 0, analyses: 0 },
  ];

  const recentActivity = [
    { id: 1, user: "Ricardo Costa", action: "Nova análise criada", time: "2 min atrás" },
    { id: 2, user: "Marina Silva", action: "Estratégia atualizada", time: "15 min atrás" },
    { id: 3, user: "Pedro Almeida", action: "Login realizado", time: "1 hora atrás" },
    { id: 4, user: "Ana Santos", action: "Assinatura cancelada", time: "3 horas atrás" },
    { id: 5, user: "Carlos Ferreira", action: "Conta criada", time: "5 horas atrás" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">Painel Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{userData?.user.name}</p>
              <Badge variant="default">ADMIN</Badge>
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
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie usuários, assinaturas e monitore o sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total de Usuários</CardDescription>
              <CardTitle className="text-3xl">1,247</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% este mês
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Usuários Ativos</CardDescription>
              <CardTitle className="text-3xl text-green-600">1,108</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-600">
                <Activity className="h-4 w-4 mr-1" />
                88.9% do total
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Taxa Global</CardDescription>
              <CardTitle className="text-3xl text-blue-600">87%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-blue-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Acertos
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Análises Hoje</CardDescription>
              <CardTitle className="text-3xl">8,456</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <Activity className="h-4 w-4 mr-1" />
                Em andamento
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="create">Criar Usuário</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Lista de todos os usuários cadastrados no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Nome</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Taxa Acerto</th>
                        <th className="text-left py-3 px-4">Análises</th>
                        <th className="text-left py-3 px-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-4 font-medium">{user.name}</td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={
                                user.status === "ACTIVE" ? "default" : 
                                user.status === "PENDING" ? "secondary" : 
                                "destructive"
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            {user.winRate > 0 ? (
                              <span className="text-green-600 font-semibold">{user.winRate}%</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">{user.analyses}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {user.status === "ACTIVE" ? (
                                <Button size="sm" variant="destructive">
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Pausar
                                </Button>
                              ) : (
                                <Button size="sm" variant="default">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Ativar
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Criar Novo Usuário</CardTitle>
                <CardDescription>
                  Cadastre manualmente um novo usuário no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="new-name">Nome Completo</Label>
                    <Input
                      id="new-name"
                      type="text"
                      placeholder="Nome do usuário"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-email">Email</Label>
                    <Input
                      id="new-email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Criar Usuário
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Gerais do Sistema</CardTitle>
                <CardDescription>Performance global do bot e análises</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
                    <div className="text-sm text-gray-600">Taxa Global de Acertos</div>
                  </div>
                  <div className="border rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">10,247</div>
                    <div className="text-sm text-gray-600">Análises Este Mês</div>
                  </div>
                  <div className="border rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                    <div className="text-sm text-gray-600">Ligas Monitoradas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas ações dos usuários no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
