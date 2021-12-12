import { AppException } from "@shared/exceptions/AppException";

export class AlreadyMemberOfGuildException extends AppException {
  constructor() {
    super("AlreadyMemberOfGuild", "You're already member of this guild.");
  }
}
