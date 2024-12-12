import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePersonCommand } from '../update-person.command';
import { PersonAggregate } from '../../models/Person.aggregate';
import { InternalServerErrorException } from '@nestjs/common';
import { EventHandlerService } from '../../../core/services/EventHandlerService';

@CommandHandler(UpdatePersonCommand)
export class UpdatePersonHandler implements ICommandHandler<UpdatePersonCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventHandlerService: EventHandlerService,
  ) {}

  async execute(command: UpdatePersonCommand) {
    try {
      const { email, personId, age, address, phoneNumber, country } = command;
      const person = new PersonAggregate(personId);
      const personObject = this.publisher.mergeObjectContext(person);
      
      personObject.updatePerson(personId, email, age, address, phoneNumber, country);
      
      await this.eventHandlerService.handleEvents(personObject);

      return {
        personId, email, age, address, phoneNumber, country
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Failed to update person: ${error.message}`);
    }
  }
}
