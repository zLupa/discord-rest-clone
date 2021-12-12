import { ICreateGuildMemberDTO } from "@modules/guilds/dtos/ICreateGuildMemberDTO";
import { GuildMember } from "@modules/guilds/infra/typeorm/entities/GuildMember";

import { IGuildMembersRepository } from "../IGuildMembersRepository";

export class GuildMembersRepositoryInMemory implements IGuildMembersRepository {
  private guildMembers: GuildMember[] = [];

  async findAllMembersByUser(user_id: string): Promise<GuildMember[]> {
    return this.guildMembers.filter(
      (guildMember) => guildMember.user_id === user_id
    );
  }

  async create({
    guild_id,
    user_id,
  }: ICreateGuildMemberDTO): Promise<GuildMember> {
    const guildMember = new GuildMember();

    Object.assign(guildMember, {
      user_id,
      guild_id,
      created_at: new Date(),
    });

    this.guildMembers.push(guildMember);

    return guildMember;
  }

  async findByUserAndGuild(
    user_id: string,
    guild_id: string
  ): Promise<GuildMember> {
    return this.guildMembers.find(
      (guildMember) =>
        guildMember.user_id === user_id && guildMember.guild_id === guild_id
    );
  }
}
