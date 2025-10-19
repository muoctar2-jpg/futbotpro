#!/bin/bash

echo "🔍 DIAGNÓSTICO - FutProBot"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "1️⃣ Verificando arquivo .env..."
if [ -f .env ]; then
    echo "✅ Arquivo .env existe"
    echo ""
    echo "📋 Conteúdo (primeiras 100 chars de cada linha):"
    while IFS= read -r line; do
        key=$(echo "$line" | cut -d'=' -f1)
        value=$(echo "$line" | cut -d'=' -f2- | cut -c1-100)
        echo "   $key=${value}..."
    done < .env
else
    echo "❌ Arquivo .env NÃO existe!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ Verificando DATABASE_URL..."
DB_URL=$(grep "^DATABASE_URL=" .env | cut -d'=' -f2-)
if [[ $DB_URL == *"postgrespostgresql"* ]]; then
    echo "❌ DATABASE_URL está DUPLICADA!"
    echo "   Encontrado: postgrespostgresql://..."
    echo "   ⚠️  AÇÃO: Edite o .env e corrija!"
elif [[ $DB_URL == postgresql://* ]]; then
    echo "✅ DATABASE_URL parece correta"
else
    echo "❌ DATABASE_URL inválida ou vazia"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ Testando URLs do Supabase..."
SUPA_URL=$(grep "^NEXT_PUBLIC_SUPABASE_URL=" .env | cut -d'=' -f2- | tr -d '"')
if [ -n "$SUPA_URL" ]; then
    echo "   URL: $SUPA_URL"
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SUPA_URL" 2>/dev/null)
    if [ "$STATUS" = "200" ] || [ "$STATUS" = "404" ] || [ "$STATUS" = "403" ]; then
        echo "✅ URL responde (HTTP $STATUS)"
    else
        echo "❌ URL não responde corretamente (HTTP $STATUS)"
    fi
else
    echo "❌ NEXT_PUBLIC_SUPABASE_URL vazia!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ Verificando Bun..."
if command -v bun &> /dev/null; then
    echo "✅ Bun instalado: $(bun --version)"
else
    echo "❌ Bun não encontrado!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ Testando conexão com banco..."
export PATH="$HOME/.bun/bin:$PATH"
bunx prisma db pull --force 2>&1 | grep -q "Error" && {
    echo "❌ Erro ao conectar com banco"
    echo "   Execute: bunx prisma db pull"
    echo "   Para ver detalhes do erro"
} || {
    echo "✅ Conexão com banco OK!"
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 RESUMO:"
echo ""
echo "Se algum item acima está com ❌:"
echo "1. Edite o .env: nano .env"
echo "2. Corrija os valores"
echo "3. Execute este diagnóstico novamente"
echo ""
echo "Para criar usuário direto no Supabase:"
echo "Leia: INSTALACAO_EXTERNA.md (Passo 4)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
