import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { InjectModel } from '@nestjs/mongoose';
import { Person as PersonDocument } from '../../schemas/person';
import { Model } from 'mongoose';
import { PersonUpdatedEvent } from '../person-updated.event';

@EventsHandler(PersonUpdatedEvent)
export class PersonUpdatedMongoHandler implements IEventHandler<PersonUpdatedEvent> {
  
  constructor(
    @InjectModel(PersonDocument.name) private personModel: Model<PersonDocument>,
  ) {}

  async handle(event: PersonUpdatedEvent) {
    console.log(clc.greenBright('Entrando a MongoDB para procesar el evento PersonUpdated'));

    try {
      const updatedPerson = await this.personModel.findOneAndUpdate(
        { personId: event.personId },
        {
          email: event.email,
          age: event.age,
          address: event.address,
          phoneNumber: event.phoneNumber,
          country: event.country,
        },
        { new: true, upsert: true }
      ).exec();

      if (updatedPerson) {
        console.log(clc.greenBright('Persona actualizada o insertada correctamente.'));
      }
    } catch (error) {
      console.log(clc.redBright('Error actualizando o insertando persona:'), error);
    }
  }
}


