import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function main() {
  console.log('🌱 Iniciando seed...');

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('📧 Criando usuário teste no Supabase Auth...');
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: 'teste@sportbot.com',
    password: 'Teste@123',
  });

  if (authError) {
    console.error('Erro ao criar usuário no Supabase:', authError);
    if (!authError.message.includes('already registered')) {
      throw authError;
    }
    console.log('⚠️  Usuário já existe no Supabase Auth');
  } else {
    console.log('✅ Usuário criado no Supabase Auth');
  }

  console.log('👤 Criando usuário teste no banco de dados...');
  const testUser = await prisma.user.upsert({
    where: { email: 'teste@sportbot.com' },
    update: {},
    create: {
      email: 'teste@sportbot.com',
      name: 'Usuário Teste',
      passwordHash: 'managed-by-supabase',
      role: 'USER',
      isActive: true,
    },
  });

  console.log('✅ Usuário teste criado:', testUser.email);

  console.log('💳 Criando assinatura ativa...');
  const subscription = await prisma.subscription.upsert({
    where: { userId: testUser.id },
    update: {
      status: 'ACTIVE',
      planType: 'PREMIUM',
      amount: 97.00,
    },
    create: {
      userId: testUser.id,
      status: 'ACTIVE',
      planType: 'PREMIUM',
      amount: 97.00,
    },
  });

  console.log('✅ Assinatura criada');

  console.log('⚙️  Criando estratégia padrão...');
  const strategy = await prisma.strategy.create({
    data: {
      userId: testUser.id,
      name: 'Estratégia Principal',
      leagues: ['Premier League', 'La Liga', 'Serie A'],
      minOdds: 1.5,
      maxOdds: 3.0,
      betType: ['Over/Under', 'BTTS'],
      minGames: 2,
      isActive: true,
    },
  });

  console.log('✅ Estratégia criada');

  console.log('📊 Criando análises de exemplo...');
  
  const analyses = [
    {
      userId: testUser.id,
      strategyId: strategy.id,
      matchId: '1001',
      league: 'Premier League',
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool',
      prediction: 'Over 2.5 Goals',
      odds: 1.85,
      confidence: 0.87,
      matchDate: new Date('2025-01-20T15:00:00Z'),
    },
    {
      userId: testUser.id,
      strategyId: strategy.id,
      matchId: '1002',
      league: 'La Liga',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      prediction: 'BTTS Yes',
      odds: 1.75,
      confidence: 0.82,
      matchDate: new Date('2025-01-21T20:00:00Z'),
    },
    {
      userId: testUser.id,
      strategyId: strategy.id,
      matchId: '1003',
      league: 'Serie A',
      homeTeam: 'Juventus',
      awayTeam: 'Inter Milan',
      prediction: 'Home Win',
      odds: 2.10,
      confidence: 0.75,
      matchDate: new Date('2025-01-19T18:00:00Z'),
    },
  ];

  for (const analysis of analyses) {
    const createdAnalysis = await prisma.analysis.create({
      data: analysis,
    });
    console.log(`✅ Análise criada: ${analysis.homeTeam} vs ${analysis.awayTeam}`);
  }

  console.log('🏆 Criando resultados...');
  
  const allAnalyses = await prisma.analysis.findMany({
    where: { userId: testUser.id },
  });

  for (const [index, analysis] of allAnalyses.entries()) {
    const isWin = index < 2;
    await prisma.result.create({
      data: {
        analysisId: analysis.id,
        userId: testUser.id,
        outcome: isWin ? 'WIN' : 'LOSS',
        finalScore: isWin ? '3-2' : '1-0',
        profit: isWin ? 85 : -100,
      },
    });
    console.log(`✅ Resultado criado: ${isWin ? 'WIN' : 'LOSS'}`);
  }

  console.log('👨‍💼 Criando usuário admin...');
  const { data: adminAuthData, error: adminAuthError } = await supabase.auth.signUp({
    email: 'admin@sportbot.com',
    password: 'Admin@123',
  });

  if (adminAuthError && !adminAuthError.message.includes('already registered')) {
    console.error('Erro ao criar admin no Supabase:', adminAuthError);
  }

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sportbot.com' },
    update: {
      role: 'ADMIN',
    },
    create: {
      email: 'admin@sportbot.com',
      name: 'Administrador',
      passwordHash: 'managed-by-supabase',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Usuário admin criado:', adminUser.email);

  await prisma.subscription.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      status: 'ACTIVE',
      planType: 'PREMIUM',
      amount: 0,
    },
  });

  console.log('\n🎉 Seed concluído com sucesso!\n');
  console.log('📝 Credenciais criadas:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 Usuário Teste:');
  console.log('   Email: teste@sportbot.com');
  console.log('   Senha: Teste@123');
  console.log('');
  console.log('👨‍💼 Usuário Admin:');
  console.log('   Email: admin@sportbot.com');
  console.log('   Senha: Admin@123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
