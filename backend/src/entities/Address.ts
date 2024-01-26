import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 7, nullable: true })
  number: string;

  @Column({ length: 20 })
  city: string;

  @Column({ length: 2 })
  state: string;
}
