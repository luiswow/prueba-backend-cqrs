import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePersonCommand } from '../create-person.command';
import { PersonAggregate } from '../../models/Person.aggregate';
import { InternalServerErrorException } from '@nestjs/common';
import { EventHandlerService } from '../../../core/services/EventHandlerService';

@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler implements ICommandHandler<CreatePersonCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventHandlerService: EventHandlerService,
  ) {}

  async execute(command: CreatePersonCommand) {
    try {
      const { email, personId, age, address, phoneNumber, country } = command;
      const Person = new PersonAggregate(personId);
      const personObject = this.publisher.mergeObjectContext(Person);
      
      personObject.createPerson(personId, email, age, address, phoneNumber, country);
      
      await this.eventHandlerService.handleEvents(personObject);

      return {
        personId, email, age, address, phoneNumber, country
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Failed to create person: ${error.message}`);
    }
  }
}
