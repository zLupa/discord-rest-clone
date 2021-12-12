import { AppException } from "@shared/exceptions/AppException";

export class GuildDoesntExistsException extends AppException {
  constructor() {
    super("GuildDoesntExists", "Guild doesn't exists.", 404);
  }
}
