import { Router } from "express";

import { CreateMessageController } from "@modules/channels/useCases/createMessage/CreateMessageController";
import { ListLatestsChannelMessagesController } from "@modules/channels/useCases/listLatestsChannelMessages/ListLatestsChannelMessagesController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const channelsRoutes = Router();
const createMessageController = new CreateMessageController();
const listLatestsChannelMessagesController =
  new ListLatestsChannelMessagesController();

channelsRoutes.post(
  "/messages/:channel_id",
  ensureAuthenticated,
  createMessageController.handle
);
channelsRoutes.get(
  "/messages/:channel_id/latests",
  ensureAuthenticated,
  listLatestsChannelMessagesController.handle
);
