import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop({ required: true })
  personId: string;

  @Prop()
  email: string;

  @Prop({ min: 0, max: 120 })
  age: number;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  country: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);