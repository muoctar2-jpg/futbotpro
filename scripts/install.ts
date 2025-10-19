#!/usr/bin/env bun

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline/promises';

const rl = readline.createInterface({ input, output });

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function header(message: string) {
  console.log('\n' + '='.repeat(60));
  log(message, colors.cyan + colors.bright);
  console.log('='.repeat(60) + '\n');
}

function success(message: string) {
  log(`✅ ${message}`, colors.green);
}

function error(message: string) {
  log(`❌ ${message}`, colors.red);
}

function warning(message: string) {
  log(`⚠️  ${message}`, colors.yellow);
}

function info(message: string) {
  log(`ℹ️  ${message}`, colors.blue);
}

async function question(prompt: string): Promise<string> {
  const answer = await rl.question(`${colors.cyan}${prompt}${colors.reset} `);
  return answer.trim();
}

function runCommand(command: string, description: string): boolean {
  try {
    log(`\n🔄 ${description}...`, colors.yellow);
    execSync(command, { stdio: 'inherit' });
    success(description + ' concluído!');
    return true;
  } catch (err) {
    error(`Falha ao executar: ${description}`);
    return false;
  }
}

function checkPrerequisites(): boolean {
  header('🔍 Verificando Pré-requisitos');

  try {
    execSync('bun --version', { stdio: 'pipe' });
    success('Bun instalado');
  } catch {
    error('Bun não está instalado!');
    info('Instale o Bun: https://bun.sh');
    return false;
  }

  try {
    execSync('node --version', { stdio: 'pipe' });
    success('Node.js instalado');
  } catch {
    warning('Node.js não encontrado (opcional, mas recomendado)');
  }

  return true;
}

async function setupEnvironment() {
  header('⚙️  Configuração de Variáveis de Ambiente');

  const envPath = '.env';
  let envContent = '';

  if (existsSync(envPath)) {
    warning('Arquivo .env já existe!');
    const overwrite = await question('Deseja sobrescrever? (s/N): ');
    if (overwrite.toLowerCase() !== 's') {
      info('Mantendo .env existente');
      return;
    }
  }

  log('\n📋 Vamos configurar suas variáveis de ambiente.\n', colors.bright);
  
  info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  info('Para obter as credenciais do Supabase:');
  info('1. Acesse https://supabase.com');
  info('2. Crie um projeto (gratuito)');
  info('3. Vá em Settings → Database → Connection String (URI)');
  info('4. Vá em Settings → API → Project URL e anon public key');
  info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const hasSupa = await question('Você já tem uma conta no Supabase? (s/N): ');
  
  if (hasSupa.toLowerCase() !== 's') {
    warning('\n⚠️  Você precisa criar uma conta no Supabase primeiro!');
    info('\n📌 Passos rápidos:');
    info('   1. Acesse: https://supabase.com');
    info('   2. Clique em "Start your project"');
    info('   3. Crie um novo projeto');
    info('   4. Aguarde 2-3 minutos');
    info('   5. Execute este instalador novamente\n');
    
    const openBrowser = await question('Deseja abrir o Supabase no navegador agora? (s/N): ');
    if (openBrowser.toLowerCase() === 's') {
      try {
        execSync('open https://supabase.com || xdg-open https://supabase.com || start https://supabase.com', { stdio: 'ignore' });
        success('Navegador aberto!');
      } catch {
        info('Acesse manualmente: https://supabase.com');
      }
    }
    
    process.exit(0);
  }

  log('\n📝 Insira as credenciais do Supabase:\n', colors.bright);

  const databaseUrl = await question('DATABASE_URL (postgresql://...): ');
  if (!databaseUrl.startsWith('postgresql://')) {
    error('DATABASE_URL inválida! Deve começar com postgresql://');
    process.exit(1);
  }

  const supabaseUrl = await question('NEXT_PUBLIC_SUPABASE_URL (https://...supabase.co): ');
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('supabase.co')) {
    error('SUPABASE_URL inválida!');
    process.exit(1);
  }

  const supabaseKey = await question('NEXT_PUBLIC_SUPABASE_ANON_KEY: ');
  if (!supabaseKey || supabaseKey.length < 20) {
    error('SUPABASE_ANON_KEY inválida!');
    process.exit(1);
  }

  info('\n🔐 Gerando JWT_SECRET...');
  let jwtSecret = '';
  try {
    jwtSecret = execSync('openssl rand -base64 32').toString().trim();
    success('JWT_SECRET gerado com sucesso!');
  } catch {
    warning('Não foi possível gerar JWT_SECRET automaticamente');
    jwtSecret = await question('Digite um JWT_SECRET (mínimo 32 caracteres): ');
  }

  envContent = `DATABASE_URL="${databaseUrl}"
NEXT_PUBLIC_SUPABASE_URL="${supabaseUrl}"
NEXT_PUBLIC_SUPABASE_ANON_KEY="${supabaseKey}"
JWT_SECRET="${jwtSecret}"
API_FOOTBALL_KEY="74a6034a3a4aa3556afb41cc0f7f048a"
`;

  writeFileSync(envPath, envContent);
  success('Arquivo .env criado com sucesso!');
}

async function testDatabaseConnection() {
  header('🔌 Testando Conexão com Banco de Dados');

  try {
    execSync('bunx prisma db pull --force', { stdio: 'pipe' });
    success('Conexão com banco de dados bem-sucedida!');
    return true;
  } catch {
    error('Não foi possível conectar ao banco de dados!');
    warning('Verifique se o DATABASE_URL está correto no arquivo .env');
    return false;
  }
}

async function setupDatabase() {
  header('🗄️  Configurando Banco de Dados');

  const runMigration = await question('Deseja executar as migrations agora? (S/n): ');
  
  if (runMigration.toLowerCase() !== 'n') {
    if (!runCommand('bunx prisma migrate dev --name init', 'Executando migrations')) {
      error('Falha ao executar migrations');
      warning('Execute manualmente: bunx prisma migrate dev --name init');
      return false;
    }
  } else {
    warning('Migrations não executadas. Execute depois: bunx prisma migrate dev --name init');
    return false;
  }

  const runSeed = await question('\nDeseja criar usuários de teste? (S/n): ');
  
  if (runSeed.toLowerCase() !== 'n') {
    if (!runCommand('bun run db:seed', 'Criando usuários de teste')) {
      error('Falha ao criar usuários de teste');
      return false;
    }

    log('\n' + '━'.repeat(60), colors.green);
    success('USUÁRIOS DE TESTE CRIADOS:');
    log('━'.repeat(60), colors.green);
    info('👤 Usuário Normal:');
    log('   Email: teste@sportbot.com', colors.bright);
    log('   Senha: Teste@123', colors.bright);
    info('\n👨‍💼 Administrador:');
    log('   Email: admin@sportbot.com', colors.bright);
    log('   Senha: Admin@123', colors.bright);
    log('━'.repeat(60) + '\n', colors.green);
  } else {
    warning('Seed não executado. Execute depois: bun run db:seed');
  }

  return true;
}

async function finalInstructions() {
  header('🎉 Instalação Concluída!');

  log('✨ O SportBot AI está pronto para uso!\n', colors.green + colors.bright);

  info('📝 Próximos passos:');
  log('   1. Inicie o servidor: bun run dev', colors.bright);
  log('   2. Acesse: http://localhost:3000', colors.bright);
  log('   3. Faça login com: teste@sportbot.com / Teste@123\n', colors.bright);

  info('📱 Páginas disponíveis:');
  log('   • Landing Page: http://localhost:3000', colors.cyan);
  log('   • Login: http://localhost:3000/login', colors.cyan);
  log('   • Dashboard: http://localhost:3000/dashboard', colors.cyan);
  log('   • Admin: http://localhost:3000/admin', colors.cyan);
  log('   • Env Check: http://localhost:3000/env-check\n', colors.cyan);

  info('🔧 Comandos úteis:');
  log('   • bun run dev - Iniciar servidor', colors.yellow);
  log('   • bun run build - Build para produção', colors.yellow);
  log('   • bun run db:studio - Abrir Prisma Studio', colors.yellow);
  log('   • bun run db:seed - Criar usuários de teste\n', colors.yellow);

  const startNow = await question('Deseja iniciar o servidor agora? (s/N): ');
  
  if (startNow.toLowerCase() === 's') {
    log('\n🚀 Iniciando servidor...\n', colors.green);
    try {
      execSync('bun run dev', { stdio: 'inherit' });
    } catch {
      info('Servidor encerrado');
    }
  } else {
    info('\n💡 Execute "bun run dev" quando estiver pronto!\n');
  }
}

async function main() {
  console.clear();
  
  log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║        🏈 SportBot AI - Instalador Automático 🏈         ║
  ║                                                           ║
  ║          Bot de Análise Esportiva Inteligente            ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `, colors.cyan + colors.bright);

  log('\n  Bem-vindo ao instalador do SportBot AI!\n', colors.bright);
  info('  Este assistente irá configurar todo o projeto passo a passo.\n');

  const continueInstall = await question('Deseja continuar? (S/n): ');
  if (continueInstall.toLowerCase() === 'n') {
    warning('Instalação cancelada.');
    process.exit(0);
  }

  if (!checkPrerequisites()) {
    process.exit(1);
  }

  await setupEnvironment();

  if (!await testDatabaseConnection()) {
    error('\nNão foi possível continuar sem conexão com o banco de dados.');
    info('Revise as credenciais no arquivo .env e execute o instalador novamente.');
    process.exit(1);
  }

  await setupDatabase();
  await finalInstructions();

  rl.close();
}

main().catch((err) => {
  error('Erro durante a instalação:');
  console.error(err);
  process.exit(1);
});
