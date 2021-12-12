import path from "path";
import { ConnectionOptions } from "typeorm";

const ormconfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  username: "postgres",
  database: "discord-rest-clone",
  password: "docker",
  port: 5432,
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
