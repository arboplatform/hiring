import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Address } from "./Address";

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: boolean;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column({ type: "double precision" })
  value: number;

  @Column({ type: "int" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.properties)
  user: User;

  @OneToOne(() => Address, { onDelete: "CASCADE" })
  @JoinColumn()
  address: Address;
}
