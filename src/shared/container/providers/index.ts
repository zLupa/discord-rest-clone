import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJSDateProvider } from "./DateProvider/implementations/DayJSDateProvider";
import { SocketIOProvider } from "./WebSocketProvider/implementations/SocketIOProvider";
import { IWebSocketProvider } from "./WebSocketProvider/IWebSocketProvider";

container.registerSingleton<IDateProvider>(
  "DayJSDateProvider",
  DayJSDateProvider
);

container.registerSingleton<IWebSocketProvider>(
  "SocketIOProvider",
  SocketIOProvider
);
