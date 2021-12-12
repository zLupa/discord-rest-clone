import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserJoinedGuildsUseCase } from "./ListUserJoinedGuildsUseCase";

export class ListUserJoinedGuildsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const listUserJoinedGuildsUseCase = container.resolve(
      ListUserJoinedGuildsUseCase
    );

    const guildsByUser = await listUserJoinedGuildsUseCase.execute(user_id);

    return response.json(guildsByUser);
  }
}
