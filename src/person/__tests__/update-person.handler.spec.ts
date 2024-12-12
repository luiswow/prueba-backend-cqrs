import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
import { UpdatePersonHandler } from '../commands/handlers/update-person.handler';
import { EventHandlerService } from '../../core/services/EventHandlerService';
import { UpdatePersonCommand } from '../commands/update-person.command';
import { AggregateRoot } from '@nestjs/cqrs';

class MockPersonAggregate extends AggregateRoot {
    updatePerson = jest.fn();
    getUncommittedEvents = jest.fn().mockReturnValue([]);
}

describe('UpdatePersonHandler', () => {
  let handler: UpdatePersonHandler;
  let eventPublisher: jest.Mocked<EventPublisher>;
  let eventHandlerService: jest.Mocked<EventHandlerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePersonHandler,
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

    handler = module.get<UpdatePersonHandler>(UpdatePersonHandler);
    eventPublisher = module.get(EventPublisher);
    eventHandlerService = module.get(EventHandlerService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should update a person successfully', async () => {
    const command = new UpdatePersonCommand(
      'test@email.com',
      '123',
      30,
      'Updated Address',
      '9876543210',
      'Updated Country'
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
    expect(mockPersonAggregate.updatePerson).toHaveBeenCalledWith(
      command.personId,
      command.email,
      command.age,
      command.address,
      command.phoneNumber,
      command.country
    );
    expect(eventHandlerService.handleEvents).toHaveBeenCalled();
  });
}); 