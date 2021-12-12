import { getRepository, Repository } from "typeorm";

import { ICreateGuildDTO } from "@modules/guilds/dtos/ICreateGuildDTO";
import type { IGuildsRepository } from "@modules/guilds/repositories/IGuildsRepository";

import { Guild } from "../entities/Guild";

export class GuildsRepositoryPostgres implements IGuildsRepository {
  private repository: Repository<Guild>;

  constructor() {
    this.repository = getRepository(Guild);
  }

  async findById(id: string): Promise<Guild> {
    return this.repository.findOne(id);
  }

  async create({
    description,
    name,
    owner_id,
  }: ICreateGuildDTO): Promise<Guild> {
    const guild = this.repository.create({
      name,
      description,
      owner_id,
    });

    await this.repository.save(guild);

    return guild;
  }
}
