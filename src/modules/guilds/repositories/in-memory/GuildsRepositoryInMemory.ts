import { ICreateGuildDTO } from "@modules/guilds/dtos/ICreateGuildDTO";
import { Guild } from "@modules/guilds/infra/typeorm/entities/Guild";

import { IGuildsRepository } from "../IGuildsRepository";

export class GuildsRepositoryInMemory implements IGuildsRepository {
  private guilds: Guild[] = [];

  async create({
    description,
    name,
    owner_id,
  }: ICreateGuildDTO): Promise<Guild> {
    const guild = new Guild();

    Object.assign(guild, {
      description,
      name,
      owner_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.guilds.push(guild);

    return guild;
  }

  async findById(id: string): Promise<Guild> {
    return this.guilds.find((guild) => guild.id === id);
  }
}
