import path from "path";
import { parse } from "pg-connection-string";
import { ConnectionOptions } from "typeorm";

const {
  host,
  port,
  user: username,
  password,
  database,
} = parse(process.env.DATABASE_URL);

const ormconfig: ConnectionOptions = {
  type: "postgres",
  host,
  username,
  database,
  password,
  port: Number(port),
  migrations: [
    path.join(`${__dirname}/..`, "/shared/infra/typeorm/migrations/**.{ts,js}"),
  ],
  entities: [path.join(`${__dirname}/..`, "/modules/**/entities/*.{ts,js}")],
  cli: {
    migrationsDir: path.join(
      `${__dirname}/..`,
      "/shared/infra/typeorm/migrations"
    ),
  },
};

export default ormconfig;
