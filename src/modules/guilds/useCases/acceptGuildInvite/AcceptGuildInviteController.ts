import { Request, Response } from "express";
import { container } from "tsyringe";

import { AcceptGuildInviteUseCase } from "./AcceptGuildInviteUseCase";

export class AcceptGuildInviteController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;
    const { id: user_id } = request.user;
    const acceptGuildInviteUseCase = container.resolve(
      AcceptGuildInviteUseCase
    );

    const invite = await acceptGuildInviteUseCase.execute(code, user_id);

    return response.json(invite);
  }
}
