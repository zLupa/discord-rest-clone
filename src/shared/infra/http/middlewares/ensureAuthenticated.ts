import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { TokenInvalidException } from "./exceptions/TokenInvalidException";
import { TokenMissingException } from "./exceptions/TokenMissingException";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new TokenMissingException();
  }

  const [, token] = request.headers.authorization.split(" ");

  if (!token) {
    throw new TokenMissingException();
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user = {
      id: decoded.sub,
    };

    return next();
  } catch (error) {
    throw new TokenInvalidException();
  }
}
