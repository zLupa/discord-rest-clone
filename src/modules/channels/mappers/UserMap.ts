import { instanceToInstance } from "class-transformer";

import { User } from "@modules/users/infra/typeorm/entities/User";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

export class UserMap {
  static toDTO({ id, tag, username, created_at }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      tag,
      username,
      created_at,
    });

    return user;
  }
}
