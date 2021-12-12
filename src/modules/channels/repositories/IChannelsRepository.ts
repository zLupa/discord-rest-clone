import { Channel } from "../infra/typeorm/entities/Channel";

export interface ICreateChannel {
  guild_id: string;
  name: string;
}

export interface IChannelsRepository {
  create({ guild_id, name }: ICreateChannel): Promise<Channel>;
  findById(id: string): Promise<Channel>;
}
