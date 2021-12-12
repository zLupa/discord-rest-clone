import { GuildMembersRepositoryInMemory } from "@modules/guilds/repositories/in-memory/GuildMembersRepositoryInMemory";
import { GuildsRepositoryInMemory } from "@modules/guilds/repositories/in-memory/GuildsRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";

import { RegisterUserUseCase } from "../registerUser/RegisterUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordException } from "./exceptions/IncorrectEmailOrPasswordException";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let guildsRepositoryInMemory: GuildsRepositoryInMemory;
let guildMembersRepositoryInMemory: GuildMembersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let registerUserUseCase: RegisterUserUseCase;

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    guildsRepositoryInMemory = new GuildsRepositoryInMemory();
    guildMembersRepositoryInMemory = new GuildMembersRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory(
      guildsRepositoryInMemory,
      guildMembersRepositoryInMemory
    );
    registerUserUseCase = new RegisterUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to authenticate an user", async () => {
    const user = await registerUserUseCase.execute({
      email: "test@test.com",
      password: "test",
      username: "test",
    });

    const tokenInfo = await authenticateUserUseCase.execute({
      email: "test@test.com",
      password: "test",
    });

    expect(tokenInfo).toHaveProperty("token");
    expect(tokenInfo.user.id).toEqual(user.id);
  });

  it("should not be able to authenticate an user if email is incorrect", async () => {
    await expect(async () => {
      await registerUserUseCase.execute({
        email: "test@test.com",
        password: "test",
        username: "test",
      });

      await authenticateUserUseCase.execute({
        email: "incorrect@email.com",
        password: "test",
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordException);
  });

  it("should not be able to authenticate an user if password is incorrect", async () => {
    await expect(async () => {
      await registerUserUseCase.execute({
        email: "test@test.com",
        password: "test",
        username: "test",
      });

      await authenticateUserUseCase.execute({
        email: "test@test.com",
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordException);
  });
});
