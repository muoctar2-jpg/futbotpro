# 🚀 Instalação Externa - FutProBot

## 📋 Problema Atual

Você está instalando em um servidor externo (`72.61.132.199:3000`) e teve erro ao criar conta:

```
Erro ao criar autenticação
```

---

## ✅ Solução Completa

### Passo 1: Verificar URL do Supabase Correta

Acesse o **Supabase Dashboard** e confirme a URL exata:
- Settings → API → Project URL

**IMPORTANTE:** Deve ser exatamente como aparece lá!

Da sua imagem anterior vi dois domínios diferentes:
- `crtakhzyarlibrsmbwtp` (imagem 1)
- `crtakhzyarllbrsmtwtp` (imagem 2)

**Use exatamente como está no Supabase!**

### Passo 2: Limpar e Reconfigurar .env

No servidor, execute:

```bash
cd /home/user/project

# Remover .env antigo
rm .env

# Criar novo .env limpo
nano .env
```

Cole exatamente isso (COM AS SUAS CREDENCIAIS):

```env
DATABASE_URL="postgresql://postgres:VlgtS6P3UUMqFn32@db.DOMINIO_CORRETO.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://DOMINIO_CORRETO.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydGFraHp5YXJsbGJyc210d3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTMwMTQsImV4cCI6MjA3NjM4OTAxNH0.PAhZMTj4OgAMyH_Nnwlr0iSv8cKwLR1hDsPKfuT0ols"
JWT_SECRET="MO7zo4mZIKxN8TtZIGlJmNynVgFV7lOeLmjB/qK+0wc="
API_FOOTBALL_KEY="74a6034a3a4aa3556afb41cc0f7f048a"
```

**Substitua `DOMINIO_CORRETO` pelo domínio real!**

Salve: `Ctrl+O`, `Enter`, `Ctrl+X`

### Passo 3: Configurar Migrations do Banco

```bash
export PATH="$HOME/.bun/bin:$PATH"
cd /home/user/project
bunx prisma generate
bunx prisma migrate deploy
```

### Passo 4: Criar Usuário Admin Direto no Supabase

Como você está tendo problema com o registro, vamos criar o usuário direto no Supabase:

1. **Abra o Supabase Dashboard**
2. Vá em **Authentication** → **Users**
3. Clique em **Add User** → **Create new user**
4. Preencha:
   - **Email**: `usuario@smartbet.com`
   - **Password**: `Senha123`
   - **Auto Confirm User**: ✅ MARCAR
5. Clique em **Create user**

### Passo 5: Criar Registro no Banco

No Supabase, vá em **SQL Editor** e execute:

```sql
-- Primeiro, pegue o ID do usuário que você criou
SELECT id, email FROM auth.users WHERE email = 'usuario@smartbet.com';

-- Anote o ID e use no comando abaixo (substitua USER_ID_AQUI)
INSERT INTO "User" (id, email, "passwordHash", name, role, "isActive", "createdAt", "updatedAt")
VALUES (
  'USER_ID_AQUI',  -- Cole o ID que você anotou
  'usuario@smartbet.com',
  'managed-by-supabase',
  'Usuário Smartbet',
  'ADMIN',
  true,
  NOW(),
  NOW()
);

-- Criar assinatura
INSERT INTO "Subscription" (id, "userId", status, "planType", "startDate", amount, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'USER_ID_AQUI',  -- Mesmo ID do usuário
  'ACTIVE',
  'PREMIUM',
  NOW(),
  97.00,
  NOW(),
  NOW()
);
```

### Passo 6: Reiniciar Servidor

```bash
# Parar servidor (se estiver rodando)
pkill -f "next dev"

# Iniciar novamente
cd /home/user/project
export PATH="$HOME/.bun/bin:$PATH"
bun run dev
```

### Passo 7: Fazer Login

Acesse: `http://72.61.132.199:3000/login`

Use:
- **Email**: `usuario@smartbet.com`
- **Senha**: `Senha123`

---

## 🔧 Alternativa: Usar Seed para Criar Usuários

Se o banco estiver configurado corretamente:

```bash
cd /home/user/project
export PATH="$HOME/.bun/bin:$PATH"
bun run db:seed
```

Isso criará automaticamente:
- **Usuário**: teste@futprobot.com / Teste@123
- **Admin**: admin@futprobot.com / Admin@123

---

## 🆘 Checklist de Problemas Comuns

### ❌ "Erro ao criar autenticação"

**Causas:**
1. DATABASE_URL incorreta ou duplicada
2. Supabase Auth não configurado
3. Domínio do Supabase errado
4. Migrations não executadas

**Solução:**
1. Verifique o `.env` está limpo (sem duplicações)
2. Confirme domínio exato no Supabase
3. Execute `bunx prisma migrate deploy`
4. Crie usuário direto no Supabase (método acima)

### ❌ "Can't reach database server"

**Causas:**
1. DATABASE_URL duplicada (veja o Prisma lendo `postgrespostgresql://`)
2. Senha incorreta
3. Domínio errado

**Solução:**
1. Delete e recrie o `.env` completamente
2. Verifique senha no Supabase
3. Teste: `psql "postgresql://postgres:SENHA@db.DOMINIO.supabase.co:5432/postgres"`

### ❌ Página de registro não funciona

**Solução temporária:**
Crie usuário direto no Supabase (Passo 4 acima)

---

## 📝 Template .env Correto

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@db.SEU_DOMINIO.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://SEU_DOMINIO.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="SUA_CHAVE_ANON"
JWT_SECRET="SUA_CHAVE_JWT_32_CARACTERES"
API_FOOTBALL_KEY="74a6034a3a4aa3556afb41cc0f7f048a"
```

**IMPORTANTE:**
- Sem aspas extras
- Sem duplicações
- Sem espaços antes/depois do `=`
- Domínio exato do Supabase

---

## 🚀 Comandos Úteis

```bash
# Ver se .env está correto
cat .env

# Testar conexão
bunx prisma db pull

# Ver tabelas
bunx prisma studio

# Recriar banco
bunx prisma migrate reset

# Ver logs do servidor
# (pressione Ctrl+C para parar)
```

---

## 💡 Recomendação Final

**Para instalação externa (servidor remoto):**

1. Configure tudo local primeiro
2. Teste que funciona
3. Depois faça deploy no servidor externo
4. Ou use Vercel/Netlify para deploy automático

**Deploy na Vercel é muito mais fácil:**
1. Push código para GitHub
2. Import no Vercel
3. Configure .env no Vercel
4. Deploy automático!

URL final: `https://futprobot.vercel.app`

---

Precisa de mais ajuda? Me envie:
1. Output do `cat .env`
2. Output do `bunx prisma db pull`
3. Confirme o domínio exato do Supabase
