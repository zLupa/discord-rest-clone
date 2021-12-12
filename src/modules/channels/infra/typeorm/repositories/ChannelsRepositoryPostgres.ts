import { getRepository, Repository } from "typeorm";

import {
  IChannelsRepository,
  ICreateChannel,
} from "@modules/channels/repositories/IChannelsRepository";

import { Channel } from "../entities/Channel";

export class ChannelsRepositoryPostgres implements IChannelsRepository {
  private repository: Repository<Channel>;

  constructor() {
    this.repository = getRepository(Channel);
  }

  async findById(id: string): Promise<Channel> {
    return this.repository.findOne(id);
  }

  async create({ guild_id, name }: ICreateChannel): Promise<Channel> {
    const channel = this.repository.create({ guild_id, name });

    await this.repository.save(channel);

    return channel;
  }
}
