import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("guild_members")
export class GuildMember {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  guild_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
  }
}
