import { inject, injectable } from "tsyringe";

import { Invite } from "@modules/guilds/infra/typeorm/entities/Invite";
import type { IGuildMembersRepository } from "@modules/guilds/repositories/IGuildMembersRepository";
import type { IInvitesRepository } from "@modules/guilds/repositories/IInvitesRepository";
import type { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { AlreadyMemberOfGuildException } from "./exceptions/AlreadyMemberOfGuildException";
import { InviteDoesntExistsException } from "./exceptions/InviteDoesntExistsException";
import { InviteExpiredException } from "./exceptions/InviteExpiredException";

@injectable()
export class AcceptGuildInviteUseCase {
  constructor(
    @inject("InvitesRepositoryPostgres")
    private invitesRepository: IInvitesRepository,

    @inject("GuildMembersRepositoryPostgres")
    private guildMembersRepository: IGuildMembersRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(code: string, user_id: string): Promise<Invite> {
    const invite = await this.invitesRepository.findByCode(code);

    if (!invite) {
      throw new InviteDoesntExistsException();
    }

    const isExpired = this.dateProvider.isBefore(
      this.dateProvider.dateNow(),
      invite.expires_in
    );

    if (isExpired) {
      throw new InviteExpiredException();
    }

    const isUserAMember = await this.guildMembersRepository.findByUserAndGuild(
      user_id,
      invite.guild_id
    );

    if (isUserAMember) {
      throw new AlreadyMemberOfGuildException();
    }

    const { guild_id } = invite;
    await this.guildMembersRepository.create({
      guild_id,
      user_id,
    });

    return invite;
  }
}
