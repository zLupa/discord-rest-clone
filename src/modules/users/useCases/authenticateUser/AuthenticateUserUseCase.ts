import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { IncorrectEmailOrPasswordException } from "./exceptions/IncorrectEmailOrPasswordException";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepositoryPostgres")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new IncorrectEmailOrPasswordException();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new IncorrectEmailOrPasswordException();
    }

    const token = sign({ username: user.username }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };
  }
}
