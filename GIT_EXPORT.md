# 📤 Guia para Exportar FutProBot para Git

## 🎯 Seu projeto já está pronto para ser exportado!

O Git já está configurado e os arquivos commitados.

---

## 🚀 Opção 1: GitHub (Recomendado)

### Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `futprobot`
   - **Description**: "Plataforma de análise de futebol com IA - Taxa de acerto de 87%"
   - **Visibility**: Private ou Public (sua escolha)
   - ⚠️ **NÃO** marque "Add a README file"
   - ⚠️ **NÃO** marque "Add .gitignore"
3. Clique em "Create repository"

### Passo 2: Conectar Repositório Local ao GitHub

Copie o comando que aparece na página (parecido com):

```bash
git remote add origin https://github.com/SEU-USUARIO/futprobot.git
```

Execute no terminal do projeto:

```bash
cd /home/user/project
git remote add origin https://github.com/SEU-USUARIO/futprobot.git
git branch -M main
git push -u origin main
```

### Passo 3: Fazer Push

```bash
git push -u origin main
```

**Pronto!** Seu código está no GitHub! 🎉

---

## 🔐 Opção 2: GitHub com SSH (Mais Seguro)

### Passo 1: Gerar Chave SSH (se não tiver)

```bash
ssh-keygen -t ed25519 -C "seu@email.com"
```

Aperte Enter 3 vezes (aceita padrões)

### Passo 2: Copiar Chave Pública

```bash
cat ~/.ssh/id_ed25519.pub
```

Copie o output completo

### Passo 3: Adicionar no GitHub

1. GitHub → Settings → SSH and GPG keys
2. Clique em "New SSH key"
3. Cole a chave
4. Clique em "Add SSH key"

### Passo 4: Conectar e Fazer Push

```bash
cd /home/user/project
git remote add origin git@github.com:SEU-USUARIO/futprobot.git
git branch -M main
git push -u origin main
```

---

## 🦊 Opção 3: GitLab

### Passo 1: Criar Projeto no GitLab

1. Acesse: https://gitlab.com/projects/new
2. Clique em "Create blank project"
3. Preencha:
   - **Project name**: `futprobot`
   - **Visibility**: Private ou Public
4. Clique em "Create project"

### Passo 2: Conectar e Fazer Push

```bash
cd /home/user/project
git remote add origin https://gitlab.com/SEU-USUARIO/futprobot.git
git branch -M main
git push -u origin main
```

---

## 📝 Comandos Git Úteis

### Ver Status
```bash
git status
```

### Ver Histórico de Commits
```bash
git log --oneline
```

### Adicionar Novos Arquivos
```bash
git add .
git commit -m "Mensagem do commit"
git push
```

### Criar Nova Branch
```bash
git checkout -b nome-da-branch
```

### Voltar para Main
```bash
git checkout main
```

---

## ⚠️ IMPORTANTE: Arquivo .gitignore

Verifique se o `.gitignore` está correto para **NÃO** enviar arquivos sensíveis:

```bash
cat .gitignore
```

Deve conter:

```
# Environment
.env
.env.local
.env.production

# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js
.next/
out/
build/
dist/

# Database
*.db
*.db-journal
prisma/migrations/

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
```

---

## 🔒 Segurança: NUNCA Commite Senhas!

### ✅ O que ESTÁ sendo ignorado (correto):
- `.env` - Suas credenciais do Supabase
- `node_modules/` - Dependências
- `.next/` - Build do Next.js

### ❌ O que NÃO deve ir para o Git:
- Senhas do banco de dados
- Chaves de API privadas
- Tokens de autenticação
- Credenciais do Supabase

### ✅ O que PODE ir para o Git:
- Todo o código fonte
- `package.json`
- `README.md`
- `.env.example` (exemplo sem credenciais reais)

---

## 📋 Checklist Antes do Push

- [ ] Arquivo `.env` NÃO está sendo commitado
- [ ] `.gitignore` está configurado corretamente
- [ ] README.md está atualizado
- [ ] Código está funcionando localmente
- [ ] Removeu console.logs desnecessários
- [ ] Comentários sensíveis foram removidos

---

## 🎯 Depois do Push

### 1. Verificar no GitHub/GitLab
- Abra o repositório no navegador
- Confira se todos os arquivos foram enviados
- Verifique se `.env` NÃO está lá

### 2. Configurar Secrets (para Deploy)
No GitHub:
1. Settings → Secrets and variables → Actions
2. Adicione:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`
   - `API_FOOTBALL_KEY`

### 3. Adicionar Badge no README (opcional)
Mostre que o projeto está ativo:

```markdown
![Status](https://img.shields.io/badge/status-active-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
```

---

## 🚀 Deploy Automático (Vercel - Recomendado)

### Opção Mais Fácil:

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em "Import Project"
4. Selecione `futprobot`
5. Configure as variáveis de ambiente
6. Clique em "Deploy"

**Pronto! Seu site estará no ar!** 🎉

URL: `https://futprobot.vercel.app`

### Configurar Domínio Personalizado (futprobot.com)

1. Compre o domínio (Registro.br, GoDaddy, Namecheap)
2. Na Vercel: Settings → Domains
3. Adicione `futprobot.com`
4. Configure DNS conforme instruções da Vercel

---

## 📞 Comandos Rápidos

### Exportar para GitHub pela primeira vez:
```bash
cd /home/user/project
git remote add origin https://github.com/SEU-USUARIO/futprobot.git
git branch -M main
git push -u origin main
```

### Fazer push de novas mudanças:
```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

### Ver repositórios remotos:
```bash
git remote -v
```

### Remover remote (se errou):
```bash
git remote remove origin
```

---

## 💡 Dicas

1. **Faça commits frequentes** com mensagens descritivas
2. **Teste localmente** antes de fazer push
3. **Use branches** para novas features
4. **Mantenha o README atualizado**
5. **NUNCA commite senhas ou .env**

---

## 🆘 Problemas Comuns

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/futprobot.git
```

### "Permission denied (publickey)"
Use HTTPS em vez de SSH:
```bash
git remote set-url origin https://github.com/SEU-USUARIO/futprobot.git
```

### ".env foi commitado por engano"
```bash
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

Depois adicione `.env` ao `.gitignore` e faça novo commit.

---

## ✅ Resumo

1. Criar repositório no GitHub/GitLab
2. Conectar: `git remote add origin URL`
3. Push: `git push -u origin main`
4. (Opcional) Deploy na Vercel
5. (Opcional) Configurar domínio futprobot.com

**Seu projeto estará profissional e pronto para produção!** 🚀
