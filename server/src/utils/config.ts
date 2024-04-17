import 'dotenv/config';

const config = {
  ENV: process.env.NODE_ENV,
  // ENV: 'production',
  PORT: process.env.PORT ?? 3000,
  HOSTNAME: process.env.HOSTNAME ?? '0.0.0.0',
  POSTGRES_CONNECTION_STRING:
    process.env.POSTGRES_CONNECTION_STRING ?? undefined,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY ?? 'NotSoSecretSecretKey',
};

export { config };
