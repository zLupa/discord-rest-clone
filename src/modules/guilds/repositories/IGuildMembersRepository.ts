import { ICreateGuildMemberDTO } from "../dtos/ICreateGuildMemberDTO";
import { GuildMember } from "../infra/typeorm/entities/GuildMember";

export interface IGuildMembersRepository {
  create({ guild_id, user_id }: ICreateGuildMemberDTO): Promise<GuildMember>;
  findByUserAndGuild(user_id: string, guild_id: string): Promise<GuildMember>;
  findAllMembersByUser(user_id: string): Promise<GuildMember[]>;
}
