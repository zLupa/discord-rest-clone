import { Router } from "express";

import { AcceptGuildInviteController } from "@modules/guilds/useCases/acceptGuildInvite/AcceptGuildInviteController";
import { CreateChannelController } from "@modules/guilds/useCases/createChannel/CreateChannelController";
import { CreateGuildController } from "@modules/guilds/useCases/createGuild/CreateGuildController";
import { CreateGuildInviteController } from "@modules/guilds/useCases/createGuildInvite/CreateGuildInviteController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const guildRoutes = Router();
const createGuildController = new CreateGuildController();
const createGuildInviteController = new CreateGuildInviteController();
const acceptGuildInviteController = new AcceptGuildInviteController();
const createChannelController = new CreateChannelController();

guildRoutes.post("/", ensureAuthenticated, createGuildController.handle);
guildRoutes.post(
  "/:guild_id/invites",
  ensureAuthenticated,
  createGuildInviteController.handle
);
guildRoutes.post(
  "/invites/accept",
  ensureAuthenticated,
  acceptGuildInviteController.handle
);
guildRoutes.post(
  "/channels/:guild_id",
  ensureAuthenticated,
  createChannelController.handle
);
