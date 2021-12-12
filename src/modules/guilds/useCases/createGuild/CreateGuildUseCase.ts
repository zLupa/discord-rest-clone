import { inject, injectable } from "tsyringe";

import { ICreateGuildDTO } from "@modules/guilds/dtos/ICreateGuildDTO";
import { Guild } from "@modules/guilds/infra/typeorm/entities/Guild";
import type { IGuildMembersRepository } from "@modules/guilds/repositories/IGuildMembersRepository";
import type { IGuildsRepository } from "@modules/guilds/repositories/IGuildsRepository";

@injectable()
export class CreateGuildUseCase {
  constructor(
    @inject("GuildsRepositoryPostgres")
    private guildsRepository: IGuildsRepository,

    @inject("GuildMembersRepositoryPostgres")
    private guildMembersRepository: IGuildMembersRepository
  ) {}

  async execute({
    description,
    name,
    owner_id,
  }: ICreateGuildDTO): Promise<Guild> {
    const guild = await this.guildsRepository.create({
      description,
      name,
      owner_id,
    });

    await this.guildMembersRepository.create({
      guild_id: guild.id,
      user_id: owner_id,
    });

    return guild;
  }
}
