import { IUserResponseDTO } from "./IUserResponseDTO";

export interface IMessageResponseDTO {
  id: string;
  channel_id: string;
  created_at: Date;
  content: string;
  user: IUserResponseDTO;
}
