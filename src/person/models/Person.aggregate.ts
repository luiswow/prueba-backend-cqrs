import { PersonCreatedEvent } from '../events/person-created.event';
import { CustomAggregateRoot } from '../../core/models/CustomAggregate';
import { PersonUpdatedEvent } from '../events/person-updated.event';
import { PersonDeletedEvent } from '../events/person-deleted.event';

export class PersonAggregate extends CustomAggregateRoot {


  createPerson(personId: string, email: string, age?: number, address?: string, phoneNumber?: string, country?: string) {
    this.apply(new PersonCreatedEvent(personId, email, age, address, phoneNumber, country));
  }

  updatePerson(personId: string, email: string, age?: number, address?: string, phoneNumber?: string, country?: string) {
    this.apply(new PersonUpdatedEvent(personId, email, age, address, phoneNumber, country));
  }

  deletePerson(personId: string) {
    this.apply(new PersonDeletedEvent(personId));
  }
}
