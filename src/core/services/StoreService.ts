import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from '../models/StoreEvents';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class EventStoreService {
  constructor(
    @InjectRepository(Events)
    private personRepository: Repository<Events>,
    private readonly eventBus: EventBus,
  ) {}

  async create(events: any[], eventAggregate) {
    const insertEvents = [];
    
    for (const [index, event] of events.entries()) {
      try {
        let version;
        const aggregateRootId = await this.findEventsByAggregateRootId(event.aggregateRootId);

        if (aggregateRootId) {
          version = aggregateRootId.length + 1;
        }

        const newEvent = this.personRepository.create({
          dateTime: event.dateTime,
          aggregateRootId: event.aggregateRootId,
          payload: JSON.stringify(event.payload),
          version: version,
          eventName: event.eventName,
        });

        const savedEvent = await this.personRepository.save(newEvent);
        insertEvents.push(savedEvent);
        

        await this.eventBus.publish(eventAggregate[index]);

      } catch (error) {
        throw new InternalServerErrorException(`Error persisting events: ${error.message}`);
      }
    }

    return insertEvents;
}

  async findEventsByAggregateRootId(aggregateRootId: string): Promise<Events[]> {
    return this.personRepository.find({ where: { aggregateRootId } });
  }
}
