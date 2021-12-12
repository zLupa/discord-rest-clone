import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Guild } from "@modules/guilds/infra/typeorm/entities/Guild";
import { generateTag } from "@shared/utils/generateTag";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  tag: string;

  @ManyToMany(() => Guild)
  @JoinTable({
    name: "guild_members",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "guild_id" }],
  })
  joinedGuilds: Guild[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
    if (!this.tag) this.tag = generateTag();
  }
}
