import { AppException } from "@shared/exceptions/AppException";

export class NotMemberOfGuildException extends AppException {
  constructor() {
    super("NotMemberOfGuild", "You're not member of this guild.", 403);
  }
}
