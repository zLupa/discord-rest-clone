import { Router } from "express";

import { authRoutes } from "./AuthRoutes";
import { channelsRoutes } from "./ChannelsRoutes";
import { guildRoutes } from "./GuildRoutes";
import { usersRoutes } from "./UsersRoutes";

const routes = Router();

routes.use("/authenticate", authRoutes);
routes.use("/guilds", guildRoutes);
routes.use("/users", usersRoutes);
routes.use("/channels", channelsRoutes);
export { routes };
