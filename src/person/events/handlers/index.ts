import { PersonCreatedMongoHandler } from './person-created-mongo.handler';
import { PersonCreatedHandler } from './person-created.handler';
import { PersonUpdatedMongoHandler } from './person-updated-mongo.handler';
import { PersonUpdatedHandler } from './person-updated.handler';
import { PersonDeletedHandler } from './person-deleted.handler';
import { PersonDeletedMongoHandler } from './person-deleted-mongo.handler';

export const EventHandlers = [
  PersonCreatedHandler,
  PersonCreatedMongoHandler,
  PersonUpdatedMongoHandler,
  PersonUpdatedHandler,
  PersonDeletedHandler,
  PersonDeletedMongoHandler
];
