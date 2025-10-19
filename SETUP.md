# 🚀 Guia de Configuração do SportBot AI

## ⚠️ IMPORTANTE: Configure o Supabase Primeiro!

Antes de executar qualquer comando, você precisa configurar o Supabase:

### Passo 1: Criar Conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou email
4. É gratuito! ✅

### Passo 2: Criar um Novo Projeto

1. No dashboard, clique em "New Project"
2. Escolha uma organização (ou crie uma nova)
3. Preencha:
   - **Project name**: `sportbot-ai` (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte (ANOTE ESSA SENHA!)
   - **Region**: Escolha o mais próximo do Brasil (South America - São Paulo)
4. Clique em "Create new project"
5. Aguarde 2-3 minutos para o projeto ser criado

### Passo 3: Obter as Credenciais

#### 3.1 - Database URL (Connection String)

1. No projeto, vá em **Settings** (ícone de engrenagem no menu lateral)
2. Clique em **Database**
3. Role até "Connection string"
4. Selecione **URI** (não Session mode)
5. Copie a string que começa com `postgresql://`
6. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha que você criou!

Exemplo:
```
postgresql://postgres.xxxxxx:SUA_SENHA_AQUI@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

#### 3.2 - Supabase URL e Anon Key

1. Ainda em **Settings**, clique em **API**
2. Você verá:
   - **Project URL**: Copie (formato: `https://xxxxx.supabase.co`)
   - **anon public**: Copie a chave (uma string longa começando com `eyJ...`)

### Passo 4: Configurar o .env

1. Abra o arquivo `.env` na raiz do projeto
2. Cole as credenciais obtidas:

```env
DATABASE_URL="postgresql://postgres.xxxxxx:SUA_SENHA@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
JWT_SECRET="sua-chave-secreta-gerada"
API_FOOTBALL_KEY="74a6034a3a4aa3556afb41cc0f7f048a"
```

#### Gerar JWT_SECRET

Execute no terminal:
```bash
openssl rand -base64 32
```

Cole o resultado no `.env`

### Passo 5: Verificar Configuração

Execute no terminal:
```bash
bun run dev
```

Acesse no navegador:
```
http://localhost:3000/env-check
```

Todas as variáveis devem aparecer em ✅ verde!

---

## 🗄️ Configurar o Banco de Dados

Agora que o Supabase está configurado, execute:

### 1. Criar as Tabelas (Migration)

```bash
bunx prisma migrate dev --name init
```

Isso vai:
- Criar todas as tabelas no banco de dados
- Gerar o Prisma Client
- Preparar o schema

### 2. Criar Usuários de Teste (Seed)

```bash
bun run db:seed
```

Isso vai criar:

**👤 Usuário Normal:**
- Email: `teste@sportbot.com`
- Senha: `Teste@123`

**👨‍💼 Administrador:**
- Email: `admin@sportbot.com`
- Senha: `Admin@123`

---

## 🎯 Testar o Sistema

### 1. Iniciar o servidor
```bash
bun run dev
```

### 2. Acessar as páginas

**Landing Page:**
```
http://localhost:3000
```

**Login:**
```
http://localhost:3000/login
```

**Dashboard (após login como usuário normal):**
```
http://localhost:3000/dashboard
```

**Painel Admin (após login como admin):**
```
http://localhost:3000/admin
```

---

## ✅ Checklist de Configuração

- [ ] Conta criada no Supabase
- [ ] Projeto criado no Supabase
- [ ] DATABASE_URL configurado no `.env`
- [ ] NEXT_PUBLIC_SUPABASE_URL configurado
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY configurado
- [ ] JWT_SECRET gerado e configurado
- [ ] API_FOOTBALL_KEY já configurado (✅ pronto!)
- [ ] `/env-check` mostrando todas variáveis OK
- [ ] `bunx prisma migrate dev` executado com sucesso
- [ ] `bun run db:seed` executado com sucesso
- [ ] Login funcionando com `teste@sportbot.com`

---

## 🆘 Problemas Comuns

### "Error: P1001: Can't reach database server"
- Verifique se o DATABASE_URL está correto
- Confirme se a senha foi substituída em `[YOUR-PASSWORD]`
- Verifique sua conexão com internet

### "Invalid login credentials"
- Certifique-se de executar o seed: `bun run db:seed`
- Use as credenciais exatas: `teste@sportbot.com` / `Teste@123`

### Página /env-check mostra variáveis faltando
- Revise o arquivo `.env`
- Reinicie o servidor (`Ctrl+C` e `bun run dev` novamente)

### Erro ao executar migration
- Confirme que o DATABASE_URL está correto
- Tente deletar a pasta `prisma/migrations` e execute novamente

---

## 🎉 Pronto!

Se tudo estiver configurado corretamente:

1. Acesse `http://localhost:3000`
2. Clique em "Login"
3. Use: `teste@sportbot.com` / `Teste@123`
4. Explore o dashboard com dados de exemplo!

Para acessar o painel admin:
1. Faça logout
2. Login com: `admin@sportbot.com` / `Admin@123`
3. Acesse `http://localhost:3000/admin`

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique o checklist acima
2. Revise as configurações do Supabase
3. Confira se todas as variáveis estão no `.env`
4. Reinicie o servidor
