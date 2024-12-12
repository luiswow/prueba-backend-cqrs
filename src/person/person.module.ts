import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { PersonSagas } from './sagas/person.sagas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from '../core/models/StoreEvents';
import { EventStoreService } from '../core/services/StoreService';
import { ReplayService } from '../core/services/ReplayService';
import { Person } from './models/Person.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Person as PersonDocument, PersonSchema } from './schemas/person'; 
import { PersonController } from './person.controller';
import { GetPersonHandler } from './queries/handlers/get-person.handler';
import { EventHandlerService } from '../core/services/EventHandlerService';

@Module({
  imports: [CqrsModule,
    TypeOrmModule.forFeature([Events,Person]),
    MongooseModule.forFeature([{ name: PersonDocument.name, schema: PersonSchema }]),
    
  ],
  controllers: [PersonController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    GetPersonHandler,
    PersonSagas,
    EventStoreService,
    ReplayService,
    EventHandlerService,
  ],
})
export class PersonModule {}
