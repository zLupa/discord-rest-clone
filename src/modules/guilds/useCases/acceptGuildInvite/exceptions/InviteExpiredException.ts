import { AppException } from "@shared/exceptions/AppException";

export class InviteExpiredException extends AppException {
  constructor() {
    super("InviteExpired", "Invite's already expired", 403);
  }
}
