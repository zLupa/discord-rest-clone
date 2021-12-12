import { AppException } from "@shared/exceptions/AppException";

export class InvalidInviteExpirationTimeException extends AppException {
  constructor() {
    super(
      "InvalidInviteExpiredTime",
      "The invite's expiration time is invalid."
    );
  }
}
