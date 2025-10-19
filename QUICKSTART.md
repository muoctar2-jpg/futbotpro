# 🚀 Guia Rápido - Visualizar o Sistema

## ⚠️ Você precisa configurar as variáveis de ambiente primeiro!

Como mostrado na imagem, estão faltando **4 variáveis**:

1. `DATABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_URL`
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. `JWT_SECRET`

---

## 📋 Opção 1: Usar o Instalador Automático (RECOMENDADO)

Execute este comando no terminal:

```bash
bun run setup
```

O instalador irá:
- ✅ Guiá-lo passo a passo
- ✅ Criar o arquivo `.env` automaticamente
- ✅ Validar as credenciais
- ✅ Configurar o banco de dados
- ✅ Criar usuários de teste
- ✅ Iniciar o servidor

---

## 📝 Opção 2: Configuração Manual Rápida

### 1. Criar conta no Supabase (GRATUITO)

Acesse: https://supabase.com

1. Clique em "Start your project"
2. Faça login com GitHub ou Email
3. Clique em "New Project"
4. Preencha:
   - **Name**: futprobot
   - **Database Password**: Crie uma senha forte (ANOTE!)
   - **Region**: South America (São Paulo)
5. Clique em "Create new project"
6. **Aguarde 2-3 minutos** para o projeto ser criado

### 2. Obter as Credenciais

#### DATABASE_URL:
1. No Supabase, vá em **Settings** (ícone de engrenagem)
2. Clique em **Database**
3. Role até "Connection string"
4. Selecione **URI**
5. Copie a string (começa com `postgresql://`)
6. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha que você criou!

Exemplo:
```
postgresql://postgres.xxxxx:SUASENHA@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

#### NEXT_PUBLIC_SUPABASE_URL:
1. Em **Settings** → **API**
2. Copie o **Project URL**

Exemplo:
```
https://xxxxxxxxxxxxx.supabase.co
```

#### NEXT_PUBLIC_SUPABASE_ANON_KEY:
1. Na mesma página (**Settings** → **API**)
2. Copie a chave **anon public** (uma string longa que começa com `eyJ...`)

#### JWT_SECRET:
Execute no terminal:
```bash
openssl rand -base64 32
```

Ou use qualquer string de 32+ caracteres.

### 3. Criar o arquivo .env

No terminal, execute:

```bash
nano .env
```

Cole isso (substituindo pelos seus valores reais):

```env
DATABASE_URL="postgresql://postgres.xxxxx:SUASENHA@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
JWT_SECRET="sua-chave-secreta-gerada"
API_FOOTBALL_KEY="74a6034a3a4aa3556afb41cc0f7f048a"
```

Salve: `Ctrl+O`, `Enter`, `Ctrl+X`

### 4. Configurar Banco de Dados

```bash
bunx prisma migrate dev --name init
```

### 5. Criar Usuários de Teste

```bash
bun run db:seed
```

Isso criará:
- **Usuário**: teste@futprobot.com / Teste@123
- **Admin**: admin@futprobot.com / Admin@123

### 6. Iniciar o Sistema

```bash
bun run dev
```

### 7. Acessar

Abra no navegador:
```
http://localhost:3000
```

---

## 🎯 Verificar se está tudo OK

Acesse:
```
http://localhost:3000/env-check
```

Todas as variáveis devem aparecer em ✅ VERDE

---

## 🔐 Fazer Login

1. Acesse: http://localhost:3000/login
2. Use: `teste@futprobot.com` / `Teste@123`
3. Ou admin: `admin@futprobot.com` / `Admin@123`

---

## 📱 Páginas Disponíveis

- **Landing Page**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard
- **Admin**: http://localhost:3000/admin
- **Verificar Env**: http://localhost:3000/env-check

---

## 🆘 Problemas?

### "Error: P1001: Can't reach database server"
- Verifique se o `DATABASE_URL` está correto
- Confirme que substituiu `[YOUR-PASSWORD]` pela senha real
- Teste a conexão no Supabase Dashboard

### Página /env-check mostra variáveis faltando
- Revise o arquivo `.env`
- Reinicie o servidor: `Ctrl+C` e depois `bun run dev`

### "Invalid login credentials"
- Execute o seed: `bun run db:seed`
- Use as credenciais exatas: `teste@futprobot.com` / `Teste@123`

---

## 💡 Dica

Use o **instalador automático** para evitar erros:

```bash
bun run setup
```

Ele faz tudo automaticamente! 🚀
