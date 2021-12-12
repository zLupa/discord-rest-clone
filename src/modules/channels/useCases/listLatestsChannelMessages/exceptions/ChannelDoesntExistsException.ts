import { AppException } from "@shared/exceptions/AppException";

export class ChannelDoesntExistsException extends AppException {
  constructor() {
    super("ChannelDoesntExists", "Channel doesn't exists.", 404);
  }
}
