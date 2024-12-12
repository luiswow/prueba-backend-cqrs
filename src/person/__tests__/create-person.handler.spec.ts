import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
import { CreatePersonHandler } from '../commands/handlers/create-person.handler';
import { EventHandlerService } from '../../core/services/EventHandlerService';
import { CreatePersonCommand } from '../commands/create-person.command';
import { AggregateRoot } from '@nestjs/cqrs';

class MockPersonAggregate extends AggregateRoot {
    createPerson = jest.fn();
    getUncommittedEvents = jest.fn().mockReturnValue([]);
}

describe('CreatePersonHandler', () => {
  let handler: CreatePersonHandler;
  let eventPublisher: jest.Mocked<EventPublisher>;
  let eventHandlerService: jest.Mocked<EventHandlerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePersonHandler,
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

    handler = module.get<CreatePersonHandler>(CreatePersonHandler);
    eventPublisher = module.get(EventPublisher);
    eventHandlerService = module.get(EventHandlerService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create a person successfully', async () => {
    const command = new CreatePersonCommand(
      'test@email.com',
      '123',
      25,
      'Test Address',
      '1234567890',
      'Test Country',
    );

    const mockPersonAggregate = new MockPersonAggregate();

    eventPublisher.mergeObjectContext.mockReturnValue(mockPersonAggregate);
    eventHandlerService.handleEvents.mockResolvedValue(undefined);

    const result = await handler.execute(command);

    expect(result).toEqual({
      personId: command.personId,
      email: command.email,
      age: command.age,
      address: command.address,
      phoneNumber: command.phoneNumber,
      country: command.country,
      
    });
    expect(mockPersonAggregate.createPerson).toHaveBeenCalled();
    expect(eventHandlerService.handleEvents).toHaveBeenCalled();
  });
}); 