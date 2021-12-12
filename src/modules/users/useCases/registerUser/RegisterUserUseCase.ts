import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { EmailAlreadyExistsException } from "./exceptions/EmailAlreadyExistsException";

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject("UsersRepositoryPostgres")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username, email, password }: ICreateUserDTO) {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new EmailAlreadyExistsException();
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      username,
      email,
      password: passwordHash,
    });

    return { id: user.id, email: user.email, username: user.username };
  }
}
