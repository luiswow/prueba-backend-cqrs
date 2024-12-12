import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty({
    description: 'The email of the person',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The age of the person',
    example: 25,
    required: false,
  })
  age?: number;

  @ApiProperty({
    description: 'The address of the person',
    example: '123 Main St, City',
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
    description: 'country of the person',
    example: '+1234567890',
    required: false,
  })
  country?: string;
} 