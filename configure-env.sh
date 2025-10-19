#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║       🔧 Configurador de .env - FutProBot 🔧            ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "⚠️  IMPORTANTE: Cole suas credenciais REAIS do Supabase"
echo ""
echo "📋 Passo 1: DATABASE_URL"
echo "   Vá em: Supabase → Settings → Database → Connection String (URI)"
echo "   ⚠️  SUBSTITUA [YOUR-PASSWORD] pela senha real!"
echo ""
read -p "Cole aqui (postgresql://...): " DATABASE_URL
echo ""
echo "📋 Passo 2: NEXT_PUBLIC_SUPABASE_URL"
echo "   Vá em: Supabase → Settings → API → Project URL"
echo ""
read -p "Cole aqui (https://...supabase.co): " SUPABASE_URL
echo ""
echo "📋 Passo 3: NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   Vá em: Supabase → Settings → API → anon public"
echo ""
read -p "Cole aqui (eyJ...): " ANON_KEY
echo ""
echo "🔐 Gerando JWT_SECRET..."
JWT_SECRET=$(openssl rand -base64 32)
echo "✅ JWT_SECRET gerado!"
echo ""

cat > .env << ENVEOF
DATABASE_URL="${DATABASE_URL}"
NEXT_PUBLIC_SUPABASE_URL="${SUPABASE_URL}"
NEXT_PUBLIC_SUPABASE_ANON_KEY="${ANON_KEY}"
JWT_SECRET="${JWT_SECRET}"
API_FOOTBALL_KEY="74a6034a3a4aa3556afb41cc0f7f048a"
ENVEOF

echo "✅ Arquivo .env criado com sucesso!"
echo ""
echo "🧪 Testando conexão..."
bunx prisma db pull --force 2>&1 | grep -q "error" && {
    echo "❌ Erro na conexão!"
    echo "⚠️  Verifique se a DATABASE_URL está correta"
    echo "⚠️  Especialmente a SENHA - não pode ter [YOUR-PASSWORD]"
    exit 1
} || {
    echo "✅ Conexão com banco de dados OK!"
    echo ""
    echo "🚀 Próximos passos:"
    echo "   1. bunx prisma migrate dev --name init"
    echo "   2. bun run db:seed"
    echo "   3. bun run dev"
}
