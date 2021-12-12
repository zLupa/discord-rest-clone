import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMessageUseCase } from "./CreateMessageUseCase";

class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { channel_id } = request.params;
    const { content } = request.body;

    const createMessageUseCase = container.resolve(CreateMessageUseCase);
    const message = await createMessageUseCase.execute({
      user_id,
      channel_id,
      content,
    });

    return response.json(message);
  }
}

export { CreateMessageController };
