import "express-async-errors";
import "dotenv/config";
import "../../container";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { AppException } from "@shared/exceptions/AppException";

import createConnection from "../typeorm";
import { routes } from "./routes";

createConnection();

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppException) {
      return response.status(err.statusCode).json({ error: err.message });
    }

    return response.status(500).json({
      error: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
