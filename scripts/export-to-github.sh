#!/bin/bash

# Script para exportar FutProBot para GitHub
# Uso: ./scripts/export-to-github.sh SEU-USUARIO

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║       🚀 FutProBot - Export to GitHub Script 🚀         ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto${NC}"
    exit 1
fi

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git não está instalado!${NC}"
    exit 1
fi

# Pedir usuário do GitHub
if [ -z "$1" ]; then
    echo -e "${YELLOW}Digite seu usuário do GitHub:${NC}"
    read GITHUB_USER
else
    GITHUB_USER=$1
fi

if [ -z "$GITHUB_USER" ]; then
    echo -e "${RED}❌ Usuário do GitHub não pode estar vazio${NC}"
    exit 1
fi

REPO_NAME="futprobot"
GITHUB_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo ""
echo -e "${BLUE}📋 Configuração:${NC}"
echo -e "   Usuário: ${GREEN}${GITHUB_USER}${NC}"
echo -e "   Repositório: ${GREEN}${REPO_NAME}${NC}"
echo -e "   URL: ${GREEN}${GITHUB_URL}${NC}"
echo ""

# Verificar se .env não está sendo commitado
if git ls-files | grep -q "^\.env$"; then
    echo -e "${RED}❌ ATENÇÃO: .env está sendo rastreado pelo Git!${NC}"
    echo -e "${YELLOW}Removendo .env do Git...${NC}"
    git rm --cached .env 2>/dev/null || true
    git commit -m "Remove .env from tracking" 2>/dev/null || true
fi

# Verificar se há mudanças para commitar
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Há mudanças não commitadas${NC}"
    echo -e "${BLUE}Criando commit...${NC}"
    git add .
    git commit -m "Preparando projeto para export - FutProBot v1.0"
    echo -e "${GREEN}✅ Commit criado${NC}"
else
    echo -e "${GREEN}✅ Sem mudanças pendentes${NC}"
fi

# Verificar se remote já existe
if git remote | grep -q "^origin$"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' já existe${NC}"
    CURRENT_URL=$(git remote get-url origin)
    echo -e "   URL atual: ${CURRENT_URL}"
    echo ""
    echo -e "${YELLOW}Deseja substituir por ${GITHUB_URL}? (s/N)${NC}"
    read REPLACE
    if [ "$REPLACE" = "s" ] || [ "$REPLACE" = "S" ]; then
        git remote remove origin
        echo -e "${GREEN}✅ Remote antigo removido${NC}"
    else
        echo -e "${YELLOW}Mantendo remote existente${NC}"
        exit 0
    fi
fi

# Adicionar remote
echo -e "${BLUE}🔗 Adicionando remote...${NC}"
git remote add origin "$GITHUB_URL"
echo -e "${GREEN}✅ Remote adicionado${NC}"

# Renomear branch para main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${BLUE}📝 Renomeando branch para 'main'...${NC}"
    git branch -M main
    echo -e "${GREEN}✅ Branch renomeada${NC}"
fi

echo ""
echo -e "${YELLOW}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}⚠️  IMPORTANTE: Antes de continuar${NC}"
echo -e "${YELLOW}════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "1. Acesse: ${BLUE}https://github.com/${GITHUB_USER}${NC}"
echo -e "2. Crie um novo repositório chamado: ${GREEN}${REPO_NAME}${NC}"
echo -e "3. Marque como ${GREEN}Private${NC} ou ${GREEN}Public${NC}"
echo -e "4. ${RED}NÃO${NC} adicione README, .gitignore ou LICENSE"
echo ""
echo -e "${YELLOW}Repositório já criado no GitHub? (s/N)${NC}"
read REPO_CREATED

if [ "$REPO_CREATED" != "s" ] && [ "$REPO_CREATED" != "S" ]; then
    echo ""
    echo -e "${BLUE}📌 Execute este script novamente após criar o repositório${NC}"
    echo ""
    echo -e "${GREEN}Comando: ./scripts/export-to-github.sh ${GITHUB_USER}${NC}"
    exit 0
fi

# Fazer push
echo ""
echo -e "${BLUE}🚀 Fazendo push para o GitHub...${NC}"
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}║              🎉 EXPORT CONCLUÍDO COM SUCESSO! 🎉         ║${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}📦 Seu projeto está disponível em:${NC}"
    echo -e "   ${GREEN}https://github.com/${GITHUB_USER}/${REPO_NAME}${NC}"
    echo ""
    echo -e "${BLUE}📝 Próximos passos:${NC}"
    echo -e "   1. Acesse o repositório no GitHub"
    echo -e "   2. Configure as Secrets (Settings → Secrets)"
    echo -e "   3. (Opcional) Faça deploy na Vercel"
    echo ""
    echo -e "${BLUE}🌐 Deploy na Vercel:${NC}"
    echo -e "   ${GREEN}https://vercel.com/import/git${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Erro ao fazer push${NC}"
    echo ""
    echo -e "${YELLOW}Possíveis soluções:${NC}"
    echo -e "   1. Verifique se o repositório existe no GitHub"
    echo -e "   2. Verifique suas credenciais do Git"
    echo -e "   3. Tente usar SSH em vez de HTTPS"
    echo ""
    echo -e "${BLUE}Configurar SSH:${NC}"
    echo -e "   ${GREEN}ssh-keygen -t ed25519 -C 'seu@email.com'${NC}"
    echo -e "   ${GREEN}cat ~/.ssh/id_ed25519.pub${NC}"
    echo ""
    exit 1
fi
