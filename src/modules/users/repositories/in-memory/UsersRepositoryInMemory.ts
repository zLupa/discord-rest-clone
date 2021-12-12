import { Guild } from "@modules/guilds/infra/typeorm/entities/Guild";
import type { IGuildMembersRepository } from "@modules/guilds/repositories/IGuildMembersRepository";
import type { IGuildsRepository } from "@modules/guilds/repositories/IGuildsRepository";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  constructor(
    private guildsRepository: IGuildsRepository,
    private guildMembersRepository: IGuildMembersRepository
  ) {}

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findAllGuildsByUser(user_id: string): Promise<Guild[]> {
    const guilds = [];

    const membersByUser =
      await this.guildMembersRepository.findAllMembersByUser(user_id);

    membersByUser.forEach(async (guildMember) => {
      const guild = await this.guildsRepository.findById(guildMember.guild_id);

      guilds.push(guild);
    });

    return guilds;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async create({ email, password, username }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      email,
      password,
      username,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }
}
