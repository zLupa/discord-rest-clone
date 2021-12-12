import { GuildMembersRepositoryInMemory } from "@modules/guilds/repositories/in-memory/GuildMembersRepositoryInMemory";
import { GuildsRepositoryInMemory } from "@modules/guilds/repositories/in-memory/GuildsRepositoryInMemory";
import { InvitesRepositoryInMemory } from "@modules/guilds/repositories/in-memory/InvitesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";

import { AcceptGuildInviteUseCase } from "./AcceptGuildInviteUseCase";
import { AlreadyMemberOfGuildException } from "./exceptions/AlreadyMemberOfGuildException";

let acceptGuildInviteUseCase: AcceptGuildInviteUseCase;
let invitesRepositoryInMemory: InvitesRepositoryInMemory;
let guildMembersRepositoryInMemory: GuildMembersRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let guildsRepositoryInMemory: GuildsRepositoryInMemory;
let dateProvider: DayJSDateProvider;
describe("Accept guild invite", () => {
  beforeEach(() => {
    invitesRepositoryInMemory = new InvitesRepositoryInMemory();
    guildMembersRepositoryInMemory = new GuildMembersRepositoryInMemory();
    guildsRepositoryInMemory = new GuildsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory(
      guildsRepositoryInMemory,
      guildMembersRepositoryInMemory
    );
    dateProvider = new DayJSDateProvider();

    acceptGuildInviteUseCase = new AcceptGuildInviteUseCase(
      invitesRepositoryInMemory,
      guildMembersRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to accept guild invite", async () => {
    const { id: user_id } = await usersRepositoryInMemory.create({
      email: "nosuabi@tavurha.id",
      password: "49990563",
      username: "Lena",
    });

    const { id: guild_id } = await guildsRepositoryInMemory.create({
      name: "Test",
      description: "test",
      owner_id: user_id,
    });

    const invite = await invitesRepositoryInMemory.create({
      user_id,
      guild_id,
      expires_in: dateProvider.addHours(dateProvider.dateNow(), 48),
    });

    await acceptGuildInviteUseCase.execute(invite.code, user_id);

    const member = await guildMembersRepositoryInMemory.findByUserAndGuild(
      user_id,
      guild_id
    );

    expect(member.user_id).toEqual(user_id);
  });

  it("shoud not be able to accept guild invite if you're already member", async () => {
    const { id: user_id } = await usersRepositoryInMemory.create({
      email: "cusedad@ec.fo",
      password: "96322228",
      username: "Lillie",
    });

    const { id: guild_id } = await guildsRepositoryInMemory.create({
      name: "Test",
      description: "test",
      owner_id: user_id,
    });

    const invite = await invitesRepositoryInMemory.create({
      user_id,
      guild_id,
      expires_in: dateProvider.addHours(dateProvider.dateNow(), 48),
    });

    await guildMembersRepositoryInMemory.create({ guild_id, user_id });

    expect(async () => {
      await acceptGuildInviteUseCase.execute(invite.code, user_id);
    }).rejects.toBeInstanceOf(AlreadyMemberOfGuildException);
  });
});
