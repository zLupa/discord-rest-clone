import { Connection, createConnection } from "typeorm";

import ormconfig from "@config/ormconfig";

export default async (): Promise<Connection> => {
  Object.assign(ormconfig, {
    database:
      process.env.NODE_ENV === "test"
        ? "discord-rest-clone-tests"
        : ormconfig.database,
  });

  return createConnection(ormconfig);
};
