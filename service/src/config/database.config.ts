export const databaseConfig = () => ({
  postgresqlUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL!,
});
