import { GuildMembersRepositoryInMemory } from "@modules/guilds/repositories/in-memory/GuildMembersRepositoryInMemory";
import { GuildsRepositoryInMemory } from "@modules/guilds/repositories/in-memory/GuildsRepositoryInMemory";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";

import { EmailAlreadyExistsException } from "./exceptions/EmailAlreadyExistsException";
import { RegisterUserUseCase } from "./RegisterUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let guildsRepositoryInMemory: GuildsRepositoryInMemory;
let guildMembersRepositoryInMemory: GuildMembersRepositoryInMemory;
let registerUserUseCase: RegisterUserUseCase;

describe("Register User Use case", () => {
  beforeEach(() => {
    guildsRepositoryInMemory = new GuildsRepositoryInMemory();
    guildMembersRepositoryInMemory = new GuildMembersRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory(
      guildsRepositoryInMemory,
      guildMembersRepositoryInMemory
    );
    registerUserUseCase = new RegisterUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to register an user", async () => {
    const user: ICreateUserDTO = {
      username: "test",
      email: "test@test.com",
      password: "test",
    };

    const userRegistered = await registerUserUseCase.execute(user);

    expect(userRegistered).toHaveProperty("id");
    expect(userRegistered.email).toEqual(user.email);
  });

  it("should not be able to register an user if email already exists", async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        username: "test",
        email: "test@test.com",
        password: "test",
      };

      await registerUserUseCase.execute(user);
      await registerUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(EmailAlreadyExistsException);
  });
});
