import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventStoreService } from './StoreService';
import { PersonUpdatedEvent } from '../../person/events/person-updated.event';
import { PersonCreatedEvent } from '../../person/events/person-created.event';
import { PersonDeletedEvent } from '../../person/events/person-deleted.event';

@Injectable()
export class ReplayService {
  private eventMap: { [key: string]: new (...args: any[]) => any };

  constructor(
    private readonly eventStoreService: EventStoreService,
    private readonly eventBus: EventBus,
  ) {
    this.eventMap = {
      "PersonUpdatedEvent": PersonUpdatedEvent,
      "PersonCreatedEvent":PersonCreatedEvent,
      "PersonDeletedEvent":PersonDeletedEvent
    };
  }

  async replayEvents(aggregateRootId: string): Promise<void> {
    const events = await this.eventStoreService.findEventsByAggregateRootId(aggregateRootId);

    const filteredEvents = events.filter(event => this.eventMap[event.eventName]);

    const latestEvents = this.getLatestEvents(filteredEvents);
    console.log(latestEvents);

    latestEvents.forEach((eventRecord) => {
      const EventClass = this.eventMap[eventRecord.eventName];
      if (!EventClass) {
        throw new Error(`No se encontró la clase para el evento: ${eventRecord.eventName}`);
      }

      const payload = JSON.parse(eventRecord.payload);
      const eventInstance = new EventClass(...Object.values(payload));

      this.eventBus.publish(eventInstance);
    });
  }

  private getLatestEvents(events: any[]): any[] {
    const latestEventsMap: { [eventName: string]: any } = {};

    events.forEach((event) => {
      const existingEvent = latestEventsMap[event.eventName];

      if (!existingEvent || new Date(event.dateTime) > new Date(existingEvent.dateTime)) {
        latestEventsMap[event.eventName] = event;
      }
    });

    return Object.values(latestEventsMap);
  }
}
