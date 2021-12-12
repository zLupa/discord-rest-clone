import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListLatestsChannelMessagesUseCase } from "./ListLatestsChannelMessagesUseCase";

class ListLatestsChannelMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { channel_id } = request.params;
    const { id: user_id } = request.user;

    const listLatestsChannelMessagesUseCase = container.resolve(
      ListLatestsChannelMessagesUseCase
    );
    const messages = await listLatestsChannelMessagesUseCase.execute(
      channel_id,
      user_id
    );

    return response.json(messages);
  }
}

export { ListLatestsChannelMessagesController };
