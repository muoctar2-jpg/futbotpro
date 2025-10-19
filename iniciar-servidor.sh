#!/bin/bash

echo "🚀 INICIANDO FUTPROBOT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd /home/user/project
export PATH="$HOME/.bun/bin:$PATH"

echo "1️⃣ Limpando cache..."
rm -rf node_modules/.prisma 2>/dev/null
rm -rf .next 2>/dev/null
echo "✅ Cache limpo"
echo ""

echo "2️⃣ Gerando Prisma Client..."
bunx prisma generate
echo ""

echo "3️⃣ Verificando porta 3000..."
if lsof -i :3000 > /dev/null 2>&1; then
    echo "⚠️  Porta 3000 em uso. Parando processo..."
    pkill -f "next dev"
    sleep 2
    echo "✅ Processo parado"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 INICIANDO SERVIDOR..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 Acesse: http://72.61.132.199:3000"
echo "🔐 Login: http://72.61.132.199:3000/login"
echo ""
echo "👤 Credenciais (após configurar no Supabase):"
echo "   Email: admin@futprobot.com"
echo "   Senha: Admin@123"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

bun run dev
