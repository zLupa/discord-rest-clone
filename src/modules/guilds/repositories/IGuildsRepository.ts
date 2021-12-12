import { ICreateGuildDTO } from "../dtos/ICreateGuildDTO";
import { Guild } from "../infra/typeorm/entities/Guild";

export interface IGuildsRepository {
  create({ description, name, owner_id }: ICreateGuildDTO): Promise<Guild>;
  findById(id: string): Promise<Guild>;
}
