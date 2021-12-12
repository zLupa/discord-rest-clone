import { inject, injectable } from "tsyringe";

import { IMessageResponseDTO } from "@modules/channels/dtos/IMessageResponseDTO";
import { MessageMap } from "@modules/channels/mappers/MessageMap";
import type { IChannelsRepository } from "@modules/channels/repositories/IChannelsRepository";
import type { IMessagesRepository } from "@modules/channels/repositories/IMessagesRepository";
import type { IGuildMembersRepository } from "@modules/guilds/repositories/IGuildMembersRepository";

import { ChannelDoesntExistsException } from "./exceptions/ChannelDoesntExistsException";
import { NotMemberOfGuildException } from "./exceptions/NotMemberOfGuildException";

@injectable()
class ListLatestsChannelMessagesUseCase {
  constructor(
    @inject("MessagesRepositoryPostgres")
    private messagesRepository: IMessagesRepository,

    @inject("ChannelsRepositoryPostgres")
    private channelsRepository: IChannelsRepository,

    @inject("GuildMembersRepositoryPostgres")
    private guildMembersRepository: IGuildMembersRepository
  ) {}

  async execute(
    channel_id: string,
    user_id: string
  ): Promise<IMessageResponseDTO[]> {
    const channel = await this.channelsRepository.findById(channel_id);

    if (!channel) {
      throw new ChannelDoesntExistsException();
    }

    const member = await this.guildMembersRepository.findByUserAndGuild(
      user_id,
      channel.guild_id
    );

    if (!member) {
      throw new NotMemberOfGuildException();
    }

    const messages = await this.messagesRepository.findLatestMessagesByChannel(
      channel_id
    );

    return messages.map((message) => MessageMap.toDTO(message));
  }
}

export { ListLatestsChannelMessagesUseCase };
