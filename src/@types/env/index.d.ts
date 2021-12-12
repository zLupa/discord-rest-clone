declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    NODE_ENV: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
  }
}
