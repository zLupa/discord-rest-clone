import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { RegisterUserController } from "@modules/users/useCases/registerUser/RegisterUserController";

const authRoutes = Router();
const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/register", registerUserController.handle);
authRoutes.post("/login", authenticateUserController.handle);

export { authRoutes };
