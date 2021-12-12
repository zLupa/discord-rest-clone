import { Guild } from "@modules/guilds/infra/typeorm/entities/Guild";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  findAllGuildsByUser(user_id: string): Promise<Guild[]>;
  findById(id: string): Promise<User>;
}
