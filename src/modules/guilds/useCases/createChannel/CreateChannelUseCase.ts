import { inject, injectable } from "tsyringe";

import { ICreateChannelDTO } from "@modules/channels/dtos/ICreateChannelDTO";
import { Channel } from "@modules/channels/infra/typeorm/entities/Channel";
import type { IChannelsRepository } from "@modules/channels/repositories/IChannelsRepository";
import type { IGuildsRepository } from "@modules/guilds/repositories/IGuildsRepository";

import { GuildDoesntExistsException } from "../createGuildInvite/exceptions/GuildDoesntExistsException";
import { NotOwnerOfGuildException } from "./exceptions/NotOwnerOfGuildException";

@injectable()
class CreateChannelUseCase {
  constructor(
    @inject("GuildsRepositoryPostgres")
    private guildsRepository: IGuildsRepository,

    @inject("ChannelsRepositoryPostgres")
    private channelsRepository: IChannelsRepository
  ) {}

  async execute({
    guild_id,
    user_id,
    name,
  }: ICreateChannelDTO): Promise<Channel> {
    const guild = await this.guildsRepository.findById(guild_id);

    if (!guild) {
      throw new GuildDoesntExistsException();
    }

    if (guild.owner_id !== user_id) {
      throw new NotOwnerOfGuildException();
    }

    const channel = await this.channelsRepository.create({ guild_id, name });

    return channel;
  }
}

export { CreateChannelUseCase };
