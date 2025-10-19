# 🚀 Como Iniciar o FutProBot

## ✅ Bun Instalado com Sucesso!

Agora você tem duas opções:

---

## 🎯 Opção 1: Executar o Instalador Automático

Este instalador irá configurar TUDO automaticamente:

```bash
bun run setup
```

Ele vai perguntar e configurar:
- ✅ Credenciais do Supabase
- ✅ Arquivo .env
- ✅ Banco de dados
- ✅ Usuários de teste
- ✅ Iniciar o servidor

---

## 🔧 Opção 2: Apenas Iniciar o Servidor (se já configurou)

Se você já tem o arquivo `.env` configurado:

```bash
bun run dev
```

Depois acesse: http://localhost:3000

---

## ⚠️ Você Ainda Precisa:

### 1. Configurar Variáveis de Ambiente

Como mostrado na imagem anterior, você precisa de:

1. **DATABASE_URL** - String de conexão do Supabase
2. **NEXT_PUBLIC_SUPABASE_URL** - URL do projeto Supabase  
3. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Chave pública do Supabase
4. **JWT_SECRET** - Chave secreta (gerada automaticamente)

### 2. Como Obter Essas Credenciais?

**Método Fácil:** Execute o instalador
```bash
bun run setup
```

**Método Manual:** Siga o QUICKSTART.md ou SETUP.md

---

## 📋 Comandos Disponíveis

```bash
bun run setup        # Instalador automático (USE ESTE!)
bun run dev          # Servidor de desenvolvimento
bun run build        # Build para produção
bun run db:studio    # Abrir Prisma Studio
bun run db:seed      # Criar usuários de teste
```

---

## 🎯 Próximo Passo

Execute agora:

```bash
bun run setup
```

O instalador irá guiá-lo passo a passo! 🚀

---

## 📚 Documentação Completa

- **QUICKSTART.md** - Guia rápido
- **INSTALL.md** - Guia do instalador
- **SETUP.md** - Configuração do Supabase
- **GIT_EXPORT.md** - Como exportar para GitHub
- **README.md** - Documentação completa

---

## 🆘 Precisa de Ajuda?

1. Leia os guias acima
2. Execute `bun run setup` e siga as instruções
3. Acesse http://localhost:3000/env-check para verificar configuração
