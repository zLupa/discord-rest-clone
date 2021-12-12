import { ICreateMessageDTO } from "../dtos/ICreateMessageDTO";
import { Message } from "../infra/typeorm/entities/Message";

export interface IMessagesRepository {
  create({ channel_id, content, user_id }: ICreateMessageDTO): Promise<Message>;
  findLatestMessagesByChannel(channel_id: string): Promise<Message[]>;
}
