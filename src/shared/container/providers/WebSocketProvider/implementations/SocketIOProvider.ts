import { io } from "@shared/infra/websocket/io";

import { IWebSocketProvider } from "../IWebSocketProvider";

export class SocketIOProvider implements IWebSocketProvider {
  emitRoomEvent(room: string, event: string, data: any): void {
    io.to(room).emit(event, data);
  }

  emitEvent(event: string, data: any): void {
    io.emit(event, data);
  }
}
