import { AppException } from "@shared/exceptions/AppException";

export class TokenMissingException extends AppException {
  constructor() {
    super("TokenMissing", "Token is missing", 401);
  }
}
