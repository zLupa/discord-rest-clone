import { container } from "tsyringe";
import "./providers";

import { ChannelsRepositoryPostgres } from "@modules/channels/infra/typeorm/repositories/ChannelsRepositoryPostgres";
import { MessagesRepositoryPostgres } from "@modules/channels/infra/typeorm/repositories/MessagesRepositoryPostgres";
import type { IChannelsRepository } from "@modules/channels/repositories/IChannelsRepository";
import type { IMessagesRepository } from "@modules/channels/repositories/IMessagesRepository";
import { GuildMembersRepositoryPostgres } from "@modules/guilds/infra/typeorm/repositories/GuildMembersRepositoryPostgres";
import { GuildsRepositoryPostgres } from "@modules/guilds/infra/typeorm/repositories/GuildsRepositoryPostgres";
import { InvitesRepositoryPostgres } from "@modules/guilds/infra/typeorm/repositories/InvitesRepositoryPostgres";
import type { IGuildMembersRepository } from "@modules/guilds/repositories/IGuildMembersRepository";
import type { IGuildsRepository } from "@modules/guilds/repositories/IGuildsRepository";
import type { IInvitesRepository } from "@modules/guilds/repositories/IInvitesRepository";
import { UsersRepositoryPostgres } from "@modules/users/infra/typeorm/repositories/UsersRepositoryPostgres";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepositoryPostgres",
  UsersRepositoryPostgres
);

container.registerSingleton<IGuildsRepository>(
  "GuildsRepositoryPostgres",
  GuildsRepositoryPostgres
);

container.registerSingleton<IGuildMembersRepository>(
  "GuildMembersRepositoryPostgres",
  GuildMembersRepositoryPostgres
);

container.registerSingleton<IInvitesRepository>(
  "InvitesRepositoryPostgres",
  InvitesRepositoryPostgres
);

container.registerSingleton<IChannelsRepository>(
  "ChannelsRepositoryPostgres",
  ChannelsRepositoryPostgres
);

container.registerSingleton<IMessagesRepository>(
  "MessagesRepositoryPostgres",
  MessagesRepositoryPostgres
);
