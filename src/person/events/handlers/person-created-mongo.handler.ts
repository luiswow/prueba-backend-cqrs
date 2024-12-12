import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { PersonCreatedEvent } from '../person-created.event';
import { InjectModel } from '@nestjs/mongoose';
import { Person as PersonDocument } from '../../schemas/person';
import { Model } from 'mongoose';

@EventsHandler(PersonCreatedEvent)
export class PersonCreatedMongoHandler implements IEventHandler<PersonCreatedEvent> {
  constructor(
    @InjectModel(PersonDocument.name) private personModel: Model<PersonDocument>,
  ) {}

  async handle(event: PersonCreatedEvent) {
    console.log(clc.greenBright('Entrando a MongoDB para procesar el evento PersonCreated'));

    const existingPerson = await this.personModel.findOne({ personId: event.personId }).exec();
    
    if (existingPerson) {
      console.log(clc.yellowBright('Persona ya existe, no se creará un nuevo registro'));
      return;
    }

    const newPerson = new this.personModel({
      personId: event.personId,
      email: event.email,
      age: event.age,
      address: event.address,
      phoneNumber: event.phoneNumber,
      country: event.country,
    });
    
    return newPerson.save();
  }
}