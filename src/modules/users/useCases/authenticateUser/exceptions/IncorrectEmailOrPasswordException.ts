import { AppException } from "@shared/exceptions/AppException";

export class IncorrectEmailOrPasswordException extends AppException {
  constructor() {
    super("EmailOrPasswordIncorrect", "Email or password is incorrect", 401);
  }
}
