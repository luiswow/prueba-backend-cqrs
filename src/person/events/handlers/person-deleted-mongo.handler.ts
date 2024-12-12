import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { InjectModel } from '@nestjs/mongoose';
import { Person as PersonDocument } from '../../schemas/person';
import { Model } from 'mongoose';
import { PersonDeletedEvent } from '../person-deleted.event';

@EventsHandler(PersonDeletedEvent)
export class PersonDeletedMongoHandler implements IEventHandler<PersonDeletedEvent> {
  constructor(
    @InjectModel(PersonDocument.name) private personModel: Model<PersonDocument>,
  ) {}

  async handle(event: PersonDeletedEvent) {
    console.log(clc.greenBright('Entrando a MongoDB para procesar el evento PersonDeleted'));

    try {
      await this.personModel.deleteOne({ personId: event.personId }).exec();
      console.log(clc.greenBright('Persona eliminada correctamente en MongoDB.'));
    } catch (error) {
      console.log(clc.redBright('Error eliminando persona en MongoDB:'), error);
    }
  }
} 