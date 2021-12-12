import { Router } from "express";

import { ListUserJoinedGuildsController } from "@modules/users/useCases/listUserJoinedGuilds/ListUserJoinedGuildsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const usersRoutes = Router();
const listUserJoinedGuildsController = new ListUserJoinedGuildsController();

usersRoutes.get(
  "/guilds",
  ensureAuthenticated,
  listUserJoinedGuildsController.handle
);
