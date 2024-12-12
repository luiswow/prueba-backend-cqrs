import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
import { DeletePersonHandler } from '../commands/handlers/delete-person.handler';
import { EventHandlerService } from '../../core/services/EventHandlerService';
import { DeletePersonCommand } from '../commands/delete-person.command';
import { AggregateRoot } from '@nestjs/cqrs';

class MockPersonAggregate extends AggregateRoot {
    deletePerson = jest.fn();
    getUncommittedEvents = jest.fn().mockReturnValue([]);
}

describe('DeletePersonHandler', () => {
  let handler: DeletePersonHandler;
  let eventPublisher: jest.Mocked<EventPublisher>;
  let eventHandlerService: jest.Mocked<EventHandlerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePersonHandler,
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
        {
          provide: EventHandlerService,
          useValue: {
            handleEvents: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<DeletePersonHandler>(DeletePersonHandler);
    eventPublisher = module.get(EventPublisher);
    eventHandlerService = module.get(EventHandlerService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should delete a person successfully', async () => {
    const command = new DeletePersonCommand('123');
    const mockPersonAggregate = new MockPersonAggregate();

    eventPublisher.mergeObjectContext.mockReturnValue(mockPersonAggregate);
    eventHandlerService.handleEvents.mockResolvedValue(undefined);

    const result = await handler.execute(command);

    expect(result).toEqual({ personId: command.personId });
    expect(mockPersonAggregate.deletePerson).toHaveBeenCalledWith(command.personId);
    expect(eventHandlerService.handleEvents).toHaveBeenCalled();
  });
}); 