import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateChannelUseCase } from "./CreateChannelUseCase";

class CreateChannelController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { guild_id } = request.params;
    const { name } = request.body;

    const createChannelUseCase = container.resolve(CreateChannelUseCase);
    const channel = await createChannelUseCase.execute({
      user_id,
      guild_id,
      name,
    });

    return response.json(channel);
  }
}

export { CreateChannelController };
