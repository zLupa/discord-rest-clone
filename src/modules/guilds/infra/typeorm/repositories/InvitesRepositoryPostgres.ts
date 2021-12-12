import { getRepository, Repository } from "typeorm";

import { ICreateGuildInviteDTO } from "@modules/guilds/dtos/ICreateGuildInviteDTO";
import type { IInvitesRepository } from "@modules/guilds/repositories/IInvitesRepository";
import { generateInviteCode } from "@shared/utils/generateInviteCode";

import { Invite } from "../entities/Invite";

export class InvitesRepositoryPostgres implements IInvitesRepository {
  private repository: Repository<Invite>;

  constructor() {
    this.repository = getRepository(Invite);
  }

  async findByCode(code: string): Promise<Invite> {
    const invite = await this.repository.findOne({ code });

    return invite;
  }

  async create({
    expires_in,
    guild_id,
    user_id,
  }: ICreateGuildInviteDTO): Promise<Invite> {
    const invite = this.repository.create({
      code: generateInviteCode(),
      expires_in,
      guild_id,
      user_id,
    });

    await this.repository.save(invite);

    return invite;
  }
}
