import { inject, injectable } from "tsyringe";

import { Guild } from "@modules/guilds/infra/typeorm/entities/Guild";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

@injectable()
export class ListUserJoinedGuildsUseCase {
  constructor(
    @inject("UsersRepositoryPostgres")
    private guildMembersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<Guild[]> {
    const guildsByUser = await this.guildMembersRepository.findAllGuildsByUser(
      user_id
    );

    return guildsByUser;
  }
}
