import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeletePersonCommand } from '../delete-person.command';
import { PersonAggregate } from '../../models/Person.aggregate';
import { InternalServerErrorException } from '@nestjs/common';
import { EventHandlerService } from '../../../core/services/EventHandlerService';

@CommandHandler(DeletePersonCommand)
export class DeletePersonHandler implements ICommandHandler<DeletePersonCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventHandlerService: EventHandlerService,
  ) {}

  async execute(command: DeletePersonCommand) {
    try {
      const { personId } = command;
      const person = new PersonAggregate(personId);
      const personObject = this.publisher.mergeObjectContext(person);
      
      personObject.deletePerson(personId);
      
      await this.eventHandlerService.handleEvents(personObject);

      return { personId };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Failed to delete person: ${error.message}`);
    }
  }
}