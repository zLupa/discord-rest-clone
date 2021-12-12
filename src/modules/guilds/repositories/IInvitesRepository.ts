import { ICreateGuildInviteDTO } from "../dtos/ICreateGuildInviteDTO";
import { Invite } from "../infra/typeorm/entities/Invite";

export interface IInvitesRepository {
  create({
    user_id,
    expires_in,
    guild_id,
  }: ICreateGuildInviteDTO): Promise<Invite>;
  findByCode(code: string): Promise<Invite>;
}
