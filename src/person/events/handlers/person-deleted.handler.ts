import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonDeletedEvent } from '../person-deleted.event';
import { Person } from '../../models/Person.model';

@EventsHandler(PersonDeletedEvent)
export class PersonDeletedHandler implements IEventHandler<PersonDeletedEvent> {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async handle(event: PersonDeletedEvent) {
    console.log(clc.greenBright('PersonDeletedEvent...'));
    await this.delete(event);
  }

  async delete(event: PersonDeletedEvent) {
    try {
      await this.personRepository.delete({ personId: event.personId });
      console.log(clc.greenBright('Person deleted successfully.'));
    } catch (error) {
      console.log(clc.redBright('Error deleting Person: '), error);
    }
  }
} 