import { getRepository, Repository } from "typeorm";

import { ICreateMessageDTO } from "@modules/channels/dtos/ICreateMessageDTO";
import type { IMessagesRepository } from "@modules/channels/repositories/IMessagesRepository";

import { Message } from "../entities/Message";

export class MessagesRepositoryPostgres implements IMessagesRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = getRepository(Message);
  }

  async findLatestMessagesByChannel(channel_id: string): Promise<Message[]> {
    return this.repository.find({
      where: { channel_id },
      order: { created_at: "DESC" },
      relations: ["user"],
      take: 20,
    });
  }

  async create({
    channel_id,
    content,
    user_id,
  }: ICreateMessageDTO): Promise<Message> {
    const message = this.repository.create({ channel_id, content, user_id });

    const messageCreated = await this.repository.save(message);
    console.log(messageCreated);

    return message;
  }
}
