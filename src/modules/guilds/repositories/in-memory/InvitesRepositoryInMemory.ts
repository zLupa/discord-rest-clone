import { ICreateGuildInviteDTO } from "@modules/guilds/dtos/ICreateGuildInviteDTO";
import { Invite } from "@modules/guilds/infra/typeorm/entities/Invite";

import { IInvitesRepository } from "../IInvitesRepository";

export class InvitesRepositoryInMemory implements IInvitesRepository {
  private invites: Invite[] = [];

  async create({
    user_id,
    expires_in,
    guild_id,
  }: ICreateGuildInviteDTO): Promise<Invite> {
    const invite = new Invite();

    Object.assign(invite, {
      user_id,
      expires_in: new Date(expires_in),
      guild_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.invites.push(invite);

    return invite;
  }

  async findByCode(code: string): Promise<Invite> {
    return this.invites.find((invite) => invite.code === code);
  }
}
