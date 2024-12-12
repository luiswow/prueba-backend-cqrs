import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonUpdatedEvent } from '../person-updated.event';
import { Person } from '../../models/Person.model';

@EventsHandler(PersonUpdatedEvent)
export class PersonUpdatedHandler
  implements IEventHandler<PersonUpdatedEvent> {

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  handle(event: PersonUpdatedEvent) {
    this.updateOrInsert(event);
    console.log(clc.greenBright('PersonUpdatedEvent...'));
  }

  async updateOrInsert(event: PersonUpdatedEvent) {
    try {
      let person = await this.personRepository.findOne({ where: { personId: event.personId } });

      if (!person) {
        console.log(clc.yellowBright('Person not found, creating a new one.'));
        person = new Person();
        person.personId = event.personId; 
      }

      person.email = event.email;
      person.age = event.age;
      person.address = event.address;
      person.phoneNumber = event.phoneNumber;
      person.country = event.country;

      await this.personRepository.save(person);

      console.log(clc.greenBright('Person updated or inserted successfully.'));

    } catch (error) {
      console.log(clc.redBright('Error updating or inserting Person: '), error);
    }
  }
}
