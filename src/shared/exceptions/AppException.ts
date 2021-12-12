export class AppException {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(name: string, message: string, statusCode = 400) {
    this.statusCode = statusCode;
    this.message = message;
    this.name = name;
  }
}
