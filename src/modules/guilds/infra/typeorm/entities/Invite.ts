import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Guild } from "./Guild";

@Entity("invites")
export class Invite {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  guild_id: string;

  @ManyToOne(() => Guild)
  @JoinColumn({ name: "guild_id" })
  guild: Guild;

  @Column()
  code: string;

  @Column()
  expires_in: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
  }
}
