import { AppException } from "@shared/exceptions/AppException";

export class NotOwnerOfGuildException extends AppException {
  constructor() {
    super(
      "NotOwnerOfGuild",
      "You're not owner of this guild to create this channel.",
      403
    );
  }
}
