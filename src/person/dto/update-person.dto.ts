import { ApiProperty } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto implements Partial<CreatePersonDto> {
  @ApiProperty({
    description: 'The email of the person',
    example: 'john@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'The age of the person',
    example: 25,
    required: false,
  })
  age?: number;

  @ApiProperty({
    description: 'The address of the person',
    example: '123 Main St',
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'The phone number of the person',
    example: '+1234567890',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'The country of the person',
    example: 'United States',
    required: false,
  })
  country?: string;
}