# 🚀 Instalador Automático - SportBot AI

## Instalação Rápida (Recomendado)

Execute apenas **UM comando** para configurar todo o projeto:

```bash
bun run setup
```

O instalador automático irá:
- ✅ Verificar pré-requisitos (Bun, Node.js)
- ✅ Configurar variáveis de ambiente (.env)
- ✅ Validar credenciais do Supabase
- ✅ Testar conexão com banco de dados
- ✅ Executar migrations (criar tabelas)
- ✅ Criar usuários de teste
- ✅ Iniciar o servidor (opcional)

---

## 📋 Antes de Começar

### Pré-requisitos

1. **Bun instalado**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Conta no Supabase (gratuita)**
   - Acesse: https://supabase.com
   - Crie uma conta (GitHub ou email)
   - Crie um novo projeto
   - Aguarde 2-3 minutos para o projeto ser criado

### Credenciais Necessárias

Você precisará de 3 credenciais do Supabase:

1. **DATABASE_URL** (Connection String)
   - Settings → Database → Connection string → URI
   - Formato: `postgresql://postgres.xxx:senha@aws...supabase.com:6543/postgres`

2. **NEXT_PUBLIC_SUPABASE_URL** (Project URL)
   - Settings → API → Project URL
   - Formato: `https://xxxxx.supabase.co`

3. **NEXT_PUBLIC_SUPABASE_ANON_KEY** (Anon Public Key)
   - Settings → API → anon public
   - Uma string longa começando com `eyJ...`

---

## 🎯 Como Usar o Instalador

### Passo 1: Execute o Instalador

```bash
bun run setup
```

### Passo 2: Siga as Instruções Interativas

O instalador irá perguntar:

1. **"Você já tem uma conta no Supabase?"**
   - Se não: O instalador pode abrir o site para você criar
   - Se sim: Continue para o próximo passo

2. **Insira as credenciais do Supabase:**
   - DATABASE_URL
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - JWT_SECRET (gerado automaticamente)

3. **"Deseja executar as migrations?"**
   - Recomendado: **Sim (S)**
   - Cria todas as tabelas no banco

4. **"Deseja criar usuários de teste?"**
   - Recomendado: **Sim (S)**
   - Cria contas para testar o sistema

5. **"Deseja iniciar o servidor agora?"**
   - Opcional: Inicia automaticamente após configuração

---

## ✨ O Que o Instalador Faz?

### 1. Verificação de Pré-requisitos
```
🔍 Verificando Pré-requisitos
✅ Bun instalado
✅ Node.js instalado
```

### 2. Configuração do .env
```
⚙️  Configuração de Variáveis de Ambiente
✅ Arquivo .env criado com sucesso!
```

### 3. Teste de Conexão
```
🔌 Testando Conexão com Banco de Dados
✅ Conexão com banco de dados bem-sucedida!
```

### 4. Migrations
```
🗄️  Configurando Banco de Dados
✅ Executando migrations concluído!
```

### 5. Seed (Usuários de Teste)
```
✅ Criando usuários de teste concluído!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ USUÁRIOS DE TESTE CRIADOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Usuário Normal:
   Email: teste@sportbot.com
   Senha: Teste@123

👨‍💼 Administrador:
   Email: admin@sportbot.com
   Senha: Admin@123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6. Instruções Finais
```
🎉 Instalação Concluída!
✨ O SportBot AI está pronto para uso!

📝 Próximos passos:
   1. Inicie o servidor: bun run dev
   2. Acesse: http://localhost:3000
   3. Faça login com: teste@sportbot.com / Teste@123
```

---

## 🔧 Instalação Manual (Alternativa)

Se preferir configurar manualmente sem o instalador:

### 1. Instalar dependências
```bash
bun install
```

### 2. Configurar .env
```bash
cp .env.example .env
# Edite o .env com suas credenciais
```

### 3. Executar migrations
```bash
bunx prisma migrate dev --name init
```

### 4. Criar usuários de teste
```bash
bun run db:seed
```

### 5. Iniciar servidor
```bash
bun run dev
```

---

## 🆘 Solução de Problemas

### "Bun não está instalado"
```bash
curl -fsSL https://bun.sh/install | bash
```

### "Não foi possível conectar ao banco de dados"
- Verifique se o DATABASE_URL está correto
- Confirme que substituiu `[YOUR-PASSWORD]` pela senha real
- Teste a conexão no Supabase Dashboard

### "DATABASE_URL inválida"
- Deve começar com `postgresql://`
- Deve conter sua senha (sem `[YOUR-PASSWORD]`)
- Copie novamente do Supabase → Settings → Database

### "SUPABASE_URL inválida"
- Deve começar com `https://`
- Deve terminar com `.supabase.co`
- Copie de Supabase → Settings → API → Project URL

### Erro ao executar migrations
```bash
# Limpe e tente novamente
rm -rf prisma/migrations
bunx prisma migrate dev --name init
```

### Erro ao criar seed
```bash
# Execute manualmente
bun run db:seed
```

---

## 📁 Arquivos Criados pelo Instalador

- `.env` - Variáveis de ambiente configuradas
- `prisma/migrations/` - Migrations do banco de dados
- Database tables:
  - `User` - Usuários do sistema
  - `Subscription` - Assinaturas
  - `Strategy` - Estratégias personalizadas
  - `Analysis` - Análises do bot
  - `Result` - Resultados das análises

---

## 🎯 Após a Instalação

### Acessar o Sistema

1. **Landing Page**
   ```
   http://localhost:3000
   ```

2. **Login**
   ```
   http://localhost:3000/login
   ```
   - Use: `teste@sportbot.com` / `Teste@123`

3. **Dashboard**
   ```
   http://localhost:3000/dashboard
   ```

4. **Painel Admin**
   ```
   http://localhost:3000/admin
   ```
   - Use: `admin@sportbot.com` / `Admin@123`

5. **Verificar Variáveis**
   ```
   http://localhost:3000/env-check
   ```

### Comandos Úteis

```bash
bun run dev          # Servidor de desenvolvimento
bun run build        # Build para produção
bun run start        # Servidor de produção
bun run db:studio    # Prisma Studio (gerenciar BD)
bun run db:seed      # Criar usuários teste novamente
bun run setup        # Executar instalador novamente
```

---

## 💡 Dicas

1. **Primeira vez?** Use o instalador automático: `bun run setup`
2. **Já configurou antes?** Apenas execute: `bun run dev`
3. **Problemas?** Execute o instalador novamente: `bun run setup`
4. **Quer ver os dados?** Use: `bun run db:studio`

---

## 🎉 Pronto!

Se tudo correu bem, você deve ver:

```
🎉 Instalação Concluída!
✨ O SportBot AI está pronto para uso!
```

Acesse `http://localhost:3000` e comece a usar! 🚀
