import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Events {
    @PrimaryGeneratedColumn()
    eventId: string;

    @Column()
    aggregateRootId: string;

  @Column()
  version: string;

  @Column()
  payload: string;

  @Column()
  dateTime: string;

  @Column()
  eventName: string;
}