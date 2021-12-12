export interface IWebSocketProvider {
  emitEvent(event: string, data: any): void;
  emitRoomEvent(room: string, event: string, data: any): void;
}
