import { instanceToInstance } from "class-transformer";

import { IMessageResponseDTO } from "../dtos/IMessageResponseDTO";
import { Message } from "../infra/typeorm/entities/Message";
import { UserMap } from "./UserMap";

export class MessageMap {
  static toDTO({
    id,
    channel_id,
    created_at,
    content,
    user,
  }: Message): IMessageResponseDTO {
    const message = instanceToInstance({
      id,
      channel_id,
      created_at,
      content,
      user: UserMap.toDTO(user),
    });

    return message;
  }
}
