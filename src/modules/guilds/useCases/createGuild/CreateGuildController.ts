import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateGuildUseCase } from "./CreateGuildUseCase";

export class CreateGuildController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: owner_id } = request.user;
    const { description, name } = request.body;
    const createGuildUseCase = container.resolve(CreateGuildUseCase);

    const guild = await createGuildUseCase.execute({
      owner_id,
      description,
      name,
    });

    return response.status(201).json(guild);
  }
}
