import { Injectable } from '@nestjs/common';
import { EventStoreService } from './StoreService';

@Injectable()
export class EventHandlerService {
  constructor(
    private readonly eventStoreService: EventStoreService,
  ) {}

  async handleEvents(aggregate: any): Promise<void> {
    const uncommittedEvents = aggregate.getUncommittedEvents();
    
    if (uncommittedEvents.length === 0) return;

    try {
      await this.eventStoreService.create(uncommittedEvents, uncommittedEvents);
      
   
    } catch (error) {
      aggregate.uncommit();
      throw error;
    }
  }
} 