import { inject, injectable } from "tsyringe";

import { ICreateMessageDTO } from "@modules/channels/dtos/ICreateMessageDTO";
import { Message } from "@modules/channels/infra/typeorm/entities/Message";
import type { IChannelsRepository } from "@modules/channels/repositories/IChannelsRepository";
import type { IMessagesRepository } from "@modules/channels/repositories/IMessagesRepository";
import type { IGuildMembersRepository } from "@modules/guilds/repositories/IGuildMembersRepository";
import type { IWebSocketProvider } from "@shared/container/providers/WebSocketProvider/IWebSocketProvider";

import { ChannelDoesntExistsException } from "./exceptions/ChannelDoesntExistsException";
import { NotMemberOfGuildException } from "./exceptions/NotMemberOfGuildException";

@injectable()
class CreateMessageUseCase {
  constructor(
    @inject("MessagesRepositoryPostgres")
    private messagesRepository: IMessagesRepository,

    @inject("GuildMembersRepositoryPostgres")
    private guildMembersRepository: IGuildMembersRepository,

    @inject("ChannelsRepositoryPostgres")
    private channelsRepository: IChannelsRepository,

    @inject("SocketIOProvider")
    private websocketProvider: IWebSocketProvider
  ) {}

  async execute({
    channel_id,
    content,
    user_id,
  }: ICreateMessageDTO): Promise<Message> {
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

    const message = await this.messagesRepository.create({
      channel_id: channel.id,
      content,
      user_id,
    });

    this.websocketProvider.emitRoomEvent(
      channel.guild_id,
      "MESSAGE_CREATED",
      message
    );

    return message;
  }
}

export { CreateMessageUseCase };
