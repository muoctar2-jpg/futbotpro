# 🎯 SOLUÇÃO FINAL - Configuração Definitiva

## ❌ Problema Identificado

Seu servidor **não consegue conectar ao Supabase** diretamente porque:
1. Portas 5432 e 6543 bloqueadas no firewall
2. Connection pooler com formato incorreto

## ✅ SOLUÇÃO: Configurar Tudo no Supabase Dashboard

Como o servidor tem restrições de rede, vamos configurar TUDO diretamente no Supabase:

---

## 📋 PASSO 1: Criar Tabelas Manualmente no Supabase

1. Acesse: https://supabase.com/dashboard
2. Abra seu projeto: `crtakhzyarllbrsmtwtp`
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New Query**
5. Cole o SQL abaixo e clique em **RUN**:

```sql
-- Criar tipos Enum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PENDING');
CREATE TYPE "ResultOutcome" AS ENUM ('WIN', 'LOSS', 'PENDING');

-- Criar tabela User
CREATE TABLE "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'USER',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Criar tabela Subscription
CREATE TABLE "Subscription" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
  "planType" TEXT NOT NULL DEFAULT 'PREMIUM',
  "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "endDate" TIMESTAMP(3),
  "amount" DOUBLE PRECISION NOT NULL DEFAULT 97.00,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criar tabela Strategy
CREATE TABLE "Strategy" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "leagues" TEXT[],
  "minOdds" DOUBLE PRECISION,
  "maxOdds" DOUBLE PRECISION,
  "betType" TEXT[],
  "minGames" INTEGER,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Strategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criar tabela Analysis
CREATE TABLE "Analysis" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "strategyId" TEXT NOT NULL,
  "matchId" TEXT NOT NULL,
  "league" TEXT NOT NULL,
  "homeTeam" TEXT NOT NULL,
  "awayTeam" TEXT NOT NULL,
  "prediction" TEXT NOT NULL,
  "odds" DOUBLE PRECISION NOT NULL,
  "confidence" DOUBLE PRECISION NOT NULL,
  "matchDate" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Analysis_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criar tabela Result
CREATE TABLE "Result" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "analysisId" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  "outcome" "ResultOutcome" NOT NULL,
  "finalScore" TEXT,
  "profit" DOUBLE PRECISION,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Result_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criar índices
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");
CREATE INDEX "Strategy_userId_idx" ON "Strategy"("userId");
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");
CREATE INDEX "Analysis_strategyId_idx" ON "Analysis"("strategyId");
CREATE INDEX "Result_analysisId_idx" ON "Result"("analysisId");
CREATE INDEX "Result_userId_idx" ON "Result"("userId");
```

✅ Se aparecer "Success. No rows returned", está correto!

---

## 📋 PASSO 2: Criar Usuário Admin

### 2.1 - Criar no Supabase Auth

1. Ainda no Supabase, vá em **Authentication** → **Users**
2. Clique em **Add User** → **Create new user**
3. Preencha:
   - **Email**: `admin@futprobot.com`
   - **Password**: `Admin@123`
   - ✅ **Auto Confirm User**: MARCAR ISSO!
4. Clique em **Create user**

### 2.2 - Pegar o ID do Usuário

No **SQL Editor**, execute:

```sql
SELECT id, email FROM auth.users WHERE email = 'admin@futprobot.com';
```

**Copie o ID** que aparecer (exemplo: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 2.3 - Criar Registro nas Tabelas

No **SQL Editor**, execute (substitua `SEU_USER_ID` pelo ID que você copiou):

```sql
-- Inserir usuário
INSERT INTO "User" (id, email, "passwordHash", name, role, "isActive", "createdAt", "updatedAt")
VALUES (
  'SEU_USER_ID',  -- COLE O ID AQUI
  'admin@futprobot.com',
  'managed-by-supabase',
  'Administrador',
  'ADMIN',
  true,
  NOW(),
  NOW()
);

-- Inserir assinatura
INSERT INTO "Subscription" (id, "userId", status, "planType", "startDate", amount, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'SEU_USER_ID',  -- MESMO ID DO USUÁRIO
  'ACTIVE',
  'PREMIUM',
  NOW(),
  97.00,
  NOW(),
  NOW()
);
```

✅ Se aparecer "Success", o usuário foi criado!

---

## 📋 PASSO 3: Habilitar Row Level Security (RLS)

No **SQL Editor**, execute:

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Strategy" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Analysis" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Result" ENABLE ROW LEVEL SECURITY;

-- Políticas para admin ter acesso total
CREATE POLICY "Admin full access User" ON "User" FOR ALL USING (true);
CREATE POLICY "Admin full access Subscription" ON "Subscription" FOR ALL USING (true);
CREATE POLICY "Admin full access Strategy" ON "Strategy" FOR ALL USING (true);
CREATE POLICY "Admin full access Analysis" ON "Analysis" FOR ALL USING (true);
CREATE POLICY "Admin full access Result" ON "Result" FOR ALL USING (true);
```

---

## 📋 PASSO 4: Iniciar o Servidor

No seu servidor (72.61.132.199), execute:

```bash
cd /home/user/project
export PATH="$HOME/.bun/bin:$PATH"

# Limpar cache
rm -rf node_modules/.prisma
rm -rf .next

# Gerar Prisma Client
bunx prisma generate

# Iniciar servidor
bun run dev
```

---

## 📋 PASSO 5: Acessar o Sistema

Abra no navegador: `http://72.61.132.199:3000/login`

Use as credenciais:
- **Email**: `admin@futprobot.com`
- **Senha**: `Admin@123`

---

## ✅ Pronto! Sistema Configurado!

Agora você pode:
- ✅ Fazer login
- ✅ Acessar o dashboard
- ✅ Acessar o painel admin
- ✅ Criar novos usuários pelo painel admin

---

## 🎯 Criar Mais Usuários (Opcional)

### Via Painel Admin (Depois de Logar)

1. Faça login como admin
2. Acesse: `/admin`
3. Vá na aba "Criar Usuário"
4. Preencha os dados
5. Clique em "Criar Usuário"

### Via Supabase (Método Direto)

Repita os passos 2.1, 2.2 e 2.3 com email e senha diferentes.

---

## 🔧 Se o Servidor Não Iniciar

```bash
# Ver se a porta 3000 está em uso
lsof -i :3000

# Matar processo
pkill -f "next dev"

# Iniciar novamente
bun run dev
```

---

## 📝 Resumo dos Comandos

```bash
# No servidor
cd /home/user/project
export PATH="$HOME/.bun/bin:$PATH"
rm -rf node_modules/.prisma .next
bunx prisma generate
bun run dev
```

# No Supabase Dashboard
1. SQL Editor → Criar tabelas
2. Authentication → Criar usuário
3. SQL Editor → Inserir na tabela User
4. SQL Editor → Habilitar RLS

---

## 🎉 Está Pronto!

Agora seu FutProBot está funcionando com:
- ✅ Banco de dados configurado
- ✅ Usuário admin criado
- ✅ Sistema rodando
- ✅ Pronto para usar!

**URL de acesso**: http://72.61.132.199:3000

Precisa de ajuda? Me avise! 🚀
