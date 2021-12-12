import { getRepository, Repository } from "typeorm";

import { ICreateGuildMemberDTO } from "@modules/guilds/dtos/ICreateGuildMemberDTO";
import type { IGuildMembersRepository } from "@modules/guilds/repositories/IGuildMembersRepository";

import { GuildMember } from "../entities/GuildMember";

export class GuildMembersRepositoryPostgres implements IGuildMembersRepository {
  private repository: Repository<GuildMember>;

  constructor() {
    this.repository = getRepository(GuildMember);
  }

  async findAllMembersByUser(user_id: string): Promise<GuildMember[]> {
    return this.repository.find({ user_id });
  }

  async findByUserAndGuild(
    user_id: string,
    guild_id: string
  ): Promise<GuildMember> {
    return this.repository.findOne({ user_id, guild_id });
  }

  async create({
    guild_id,
    user_id,
  }: ICreateGuildMemberDTO): Promise<GuildMember> {
    const guildMember = this.repository.create({ guild_id, user_id });

    await this.repository.save(guildMember);

    return guildMember;
  }
}
