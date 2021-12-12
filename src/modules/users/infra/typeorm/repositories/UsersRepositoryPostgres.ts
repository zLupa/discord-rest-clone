import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";

import { Guild } from "@modules/guilds/infra/typeorm/entities/Guild";

import { User } from "../entities/User";

export class UsersRepositoryPostgres implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async findAllGuildsByUser(user_id: string): Promise<Guild[]> {
    const user = await this.repository.findOne(user_id, {
      relations: ["joinedGuilds"],
    });

    return user.joinedGuilds;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({ username, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      username,
      password,
      email,
    });

    await this.repository.save(user);

    return user;
  }
}
