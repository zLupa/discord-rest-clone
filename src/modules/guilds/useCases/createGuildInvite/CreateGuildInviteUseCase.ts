import { inject, injectable } from "tsyringe";

import { ICreateGuildInviteDTO } from "@modules/guilds/dtos/ICreateGuildInviteDTO";
import { Invite } from "@modules/guilds/infra/typeorm/entities/Invite";
import type { IGuildMembersRepository } from "@modules/guilds/repositories/IGuildMembersRepository";
import type { IGuildsRepository } from "@modules/guilds/repositories/IGuildsRepository";
import type { IInvitesRepository } from "@modules/guilds/repositories/IInvitesRepository";
import type { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { GuildDoesntExistsException } from "./exceptions/GuildDoesntExistsException";
import { InvalidInviteExpirationTimeException } from "./exceptions/InvalidInviteExpirationTimeException";
import { NotMemberOfGuildException } from "./exceptions/NotMemberOfGuildException";

@injectable()
export class CreateGuildInviteUseCase {
  constructor(
    @inject("InvitesRepositoryPostgres")
    private invitesRepository: IInvitesRepository,

    @inject("GuildsRepositoryPostgres")
    private guildsRepository: IGuildsRepository,

    @inject("GuildMembersRepositoryPostgres")
    private guildMembersRepository: IGuildMembersRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    expires_in,
    guild_id,
    user_id,
  }: ICreateGuildInviteDTO): Promise<Invite> {
    const isExpired = this.dateProvider.isBefore(
      this.dateProvider.dateNow(),
      expires_in
    );

    if (isExpired) {
      throw new InvalidInviteExpirationTimeException();
    }

    const guildExists = await this.guildsRepository.findById(guild_id);

    if (!guildExists) {
      throw new GuildDoesntExistsException();
    }

    const userJoinedGuild =
      await this.guildMembersRepository.findByUserAndGuild(user_id, guild_id);

    if (!userJoinedGuild) {
      throw new NotMemberOfGuildException();
    }

    const invite = await this.invitesRepository.create({
      guild_id,
      expires_in,
      user_id,
    });

    return invite;
  }
}
