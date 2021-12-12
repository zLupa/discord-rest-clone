import { AppException } from "@shared/exceptions/AppException";

export class EmailAlreadyExistsException extends AppException {
  constructor() {
    super("EmailAlreadyExists", "Email is already in use");
  }
}
