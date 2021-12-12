import { Request, Response } from "express";
import { container } from "tsyringe";

import { RegisterUserUseCase } from "./RegisterUserUseCase";

export class RegisterUserController {
  async handle(request: Request, response: Response) {
    const { email, password, username } = request.body;

    const registerUserUseCase = container.resolve(RegisterUserUseCase);

    const user = await registerUserUseCase.execute({
      username,
      email,
      password,
    });

    return response.json(user);
  }
}
