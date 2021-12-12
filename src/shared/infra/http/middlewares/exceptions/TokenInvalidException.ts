import { AppException } from "@shared/exceptions/AppException";

export class TokenInvalidException extends AppException {
  constructor() {
    super("TokenInvalid", "Token is invalid", 401);
  }
}
