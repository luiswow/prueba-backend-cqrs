import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { PersonCreatedEvent } from '../person-created.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../models/Person.model';

@EventsHandler(PersonCreatedEvent)
export class PersonCreatedHandler
  implements IEventHandler<PersonCreatedEvent> {

    constructor(
      @InjectRepository(Person)
      private personRepository: Repository<Person>,

    ) {}
  handle(event: PersonCreatedEvent) {
    this.create(event)
    console.log(clc.greenBright('PersonCreatedEvent...'));
  }

  async create(event:PersonCreatedEvent) {

    try {

          const newEvent = this.personRepository.create({
            personId: event.personId,
            email:event.email,
            age: event.age,
            address: event.address,
            phoneNumber: event.phoneNumber,
            country: event.country,
          });
       await this.personRepository.save(newEvent);

        
    } catch (error) {
        console.log(error)
        
    }
  }
}
