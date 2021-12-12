import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateGuildInviteUseCase } from "./CreateGuildInviteUseCase";

export class CreateGuildInviteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expires_in } = request.body;
    const { id: user_id } = request.user;
    const { guild_id } = request.params;

    const createGuildInviteUseCase = container.resolve(
      CreateGuildInviteUseCase
    );

    const invite = await createGuildInviteUseCase.execute({
      expires_in,
      guild_id,
      user_id,
    });

    return response.status(201).json(invite);
  }
}
