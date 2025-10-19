export const ENV_VARIABLES: EnvVariable[] = [
  {
    name: "DATABASE_URL",
    description: "Supabase PostgreSQL database connection string for migrations and server-side operations",
    required: true,
    instructions: "Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Settings → Database → Connection string (URI format).\n Copy the full postgresql:// connection string.\n Make sure to replace [YOUR-PASSWORD] with actual password"
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    description: "Supabase project URL for client-side authentication and API calls",
    required: true,
    instructions: "Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Settings → Data API → Copy the 'Project URL -> URL' field (format: https://[project-id].supabase.co)"
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    description: "Supabase anonymous/publishable key for client-side authentication",
    required: true,
    instructions: "Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Settings → API Keys → Copy 'Legacy API keys → anon public' key"
  },
  {
    name: "JWT_SECRET",
    description: "Secret key for JWT token generation and validation",
    required: true,
    instructions: "Generate a secure random string (minimum 32 characters). You can use: openssl rand -base64 32"
  },
  {
    name: "API_FOOTBALL_KEY",
    description: "API-Football API key for fetching sports data",
    required: false,
    instructions: "Get your API key from [API-Football](https://www.api-football.com/) dashboard"
  }
];

export interface EnvVariable {
  name: string
  description: string
  instructions: string
  required: boolean
}

export function checkMissingEnvVars(): string[] {
  return ENV_VARIABLES.filter(envVar => envVar.required && !process.env[envVar.name]).map(envVar => envVar.name)
}