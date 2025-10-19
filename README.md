# SportBot AI - Plataforma de Análises Esportivas

Bot de análise esportiva automática com integração à API-Football, oferecendo previsões e estatísticas personalizadas com taxa de acerto superior a 85%.

## 🚀 Funcionalidades

### Landing Page
- Hero section profissional com call-to-action
- Seção "Como Funciona" com passo a passo
- Exibição da taxa de acertividade (87%)
- Depoimentos de clientes
- Plano Premium com valor único (R$ 97/mês)
- Footer completo com links úteis

### Dashboard do Usuário
- **Estatísticas Pessoais**: Taxa de vitórias, perdas e lucro total
- **Gráficos Interativos**: Performance semanal e distribuição de resultados
- **Configuração de Estratégias**: Personalize ligas, tipos de aposta, odds min/max
- **Histórico de Análises**: Tabela com todas as previsões e resultados
- **Status da Assinatura**: Visualização do plano ativo

### Painel Administrativo
- **Gerenciamento de Usuários**: Listar, criar, ativar e pausar contas
- **Estatísticas Globais**: Taxa de acerto geral, total de análises
- **Atividade Recente**: Log das últimas ações dos usuários
- **Controle de Assinaturas**: Visualizar status de todos os planos

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Componentes)
- **Recharts** (Gráficos)
- **Prisma ORM**
- **Supabase** (Database & Auth)
- **JWT** (Autenticação)
- **API-Football** (Dados esportivos em tempo real)

## 📋 Pré-requisitos

- Node.js 18+ ou Bun
- Conta Supabase (gratuita)
- PostgreSQL (via Supabase)

## ⚙️ Configuração

### 1. Clone o repositório e instale as dependências

```bash
bun install
```

### 2. Configure as variáveis de ambiente

Você precisa configurar as seguintes variáveis no arquivo `.env`:

```env
DATABASE_URL="sua-connection-string-do-supabase"
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anon-do-supabase"
JWT_SECRET="chave-secreta-minimo-32-caracteres"
API_FOOTBALL_KEY="74a6034a3a4aa3556afb41cc0f7f048a"
```

**Como obter as credenciais do Supabase:**

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Crie um novo projeto (ou use um existente)
3. Vá em **Settings** → **Database** → Copie a **Connection string (URI)**
4. Vá em **Settings** → **API** → Copie **Project URL** e **anon public key**

**Para gerar o JWT_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Verifique as variáveis de ambiente

Acesse `http://localhost:3000/env-check` para verificar se todas as variáveis estão configuradas corretamente.

### 4. Configure o banco de dados

```bash
bunx prisma migrate dev --name init
```

### 5. Crie usuários de teste

```bash
bun run db:seed
```

Isso criará:
- **Usuário Teste**: `teste@sportbot.com` / `Teste@123`
- **Usuário Admin**: `admin@sportbot.com` / `Admin@123`

### 6. Inicie o servidor de desenvolvimento

```bash
bun run dev
```

Acesse: `http://localhost:3000`

## 📊 Estrutura do Banco de Dados

### User
- ID, email, nome, role (USER/ADMIN)
- Relacionamentos: subscription, strategies, analyses, results

### Subscription
- Status (ACTIVE, CANCELLED, EXPIRED, PENDING)
- Tipo de plano, valores e datas

### Strategy
- Configurações personalizadas do usuário
- Ligas, odds, tipos de aposta

### Analysis
- Análises geradas pelo bot
- Informações da partida, previsão, odds

### Result
- Resultados das análises (WIN/LOSS/PENDING)
- Lucro/prejuízo

## 🔐 Autenticação

O sistema usa:
- **Supabase Auth** para gerenciamento de usuários
- **JWT** para sessões
- Cookies HTTP-only para segurança

### Rotas Protegidas

- `/dashboard` - Apenas usuários autenticados
- `/admin` - Apenas usuários com role ADMIN

## 📱 Páginas Disponíveis

- `/` - Landing page
- `/login` - Página de login
- `/register` - Página de cadastro
- `/dashboard` - Dashboard do usuário
- `/admin` - Painel administrativo
- `/env-check` - Verificação de variáveis de ambiente

## 🎨 Componentes UI

Todos os componentes estão em `components/ui/` usando shadcn/ui:
- Buttons, Cards, Badges
- Forms, Inputs, Selects
- Tabs, Tables, Charts
- Toast notifications
- E muito mais...

## 🔧 Scripts Disponíveis

```bash
bun run dev          # Inicia servidor de desenvolvimento
bun run build        # Build para produção
bun run start        # Inicia servidor de produção
bun run db:studio    # Abre Prisma Studio
bun run db:seed      # Cria usuários de teste
```

## 👤 Credenciais de Teste

Após executar `bun run db:seed`, você pode fazer login com:

**Usuário Normal:**
- Email: `teste@sportbot.com`
- Senha: `Teste@123`
- Acesso: Dashboard com dados de exemplo

**Usuário Administrador:**
- Email: `admin@sportbot.com`
- Senha: `Admin@123`
- Acesso: Painel administrativo completo

## 🏈 API-Football

A chave da API-Football já está configurada no projeto. O serviço está em `lib/api-football.ts` e oferece:

- `getTodayMatches()` - Jogos de hoje
- `getUpcomingMatches(days)` - Jogos futuros
- `getFixtureStatistics(fixtureId)` - Estatísticas de uma partida
- `analyzePrediction(match)` - Gera previsão automática

**Limite da API**: 100 requisições/dia (plano gratuito)

## 📈 Próximos Passos

1. ✅ **Integração com API-Football**: Já configurado e pronto para uso
2. **Sistema de Pagamento**: Integrar Mercado Pago ou Stripe
3. **Notificações**: Email e push notifications
4. **Análise em Tempo Real**: Bot automático executando análises
5. **Resultados Públicos**: Página pública com estatísticas gerais

## 🤝 Contribuindo

Este é um projeto privado. Para contribuir, entre em contato com o administrador.

## 📄 Licença

Todos os direitos reservados © 2025 SportBot AI
