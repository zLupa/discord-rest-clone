import { AppException } from "@shared/exceptions/AppException";

export class InviteDoesntExistsException extends AppException {
  constructor() {
    super("InviteDoesntExists", "Invite doesn't exists.", 404);
  }
}
