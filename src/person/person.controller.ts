import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatePersonCommand } from './commands/create-person.command';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ReplayService } from '../core/services/ReplayService';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePersonCommand } from './commands/update-person.command';
import { DeletePersonCommand } from './commands/delete-person.command';
import { GetPersonQuery } from './queries/get-person.query';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly replayService: ReplayService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new person' })
  @ApiResponse({ status: 201, description: 'The person has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createPerson(@Body() dto: CreatePersonDto) {
    const myUuid = uuidv4();
    return this.commandBus.execute(
      new CreatePersonCommand(
        myUuid, 
        dto.email, 
        dto.age,
        dto.address,
        dto.phoneNumber,
        dto.country
      )
    );
  }

  @Patch(':personId')
  @ApiOperation({ summary: 'Update a person' })
  @ApiParam({ name: 'personId', description: 'The ID of the person' })
  @ApiResponse({ status: 200, description: 'The person has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  async updatePerson(
    @Param('personId') personId: string,
    @Body() dto: UpdatePersonDto,
  ) {
    return this.commandBus.execute(
      new UpdatePersonCommand(
        personId, 
        dto.email, 
        dto.age,
        dto.address,
        dto.phoneNumber,
        dto.country
      )
    );
  }

  @Delete(':personId')
  @ApiOperation({ summary: 'Delete a person' })
  @ApiParam({ name: 'personId', description: 'The ID of the person' })
  @ApiResponse({ status: 200, description: 'The person has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  async deletePerson(@Param('personId') personId: string) {
    return this.commandBus.execute(new DeletePersonCommand(personId));
  }

  @Get('/replay-events/:aggregateRootId')
  @ApiOperation({ summary: 'Replay events for a person' })
  @ApiParam({ name: 'aggregateRootId', description: 'The aggregate root ID of the person' })
  @ApiResponse({ status: 200, description: 'Events replayed successfully.' })
  async replayEvents(@Param('aggregateRootId') aggregateRootId: string) {
    return this.replayService.replayEvents(aggregateRootId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get person by ID' })
  @ApiResponse({ status: 200, description: 'Return the person.' })
  async getPerson(@Param('id') id: string) {
    return this.queryBus.execute(new GetPersonQuery(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get all persons' })
  @ApiResponse({ status: 200, description: 'Return all persons.' })
  async getAllPersons() {
    return this.queryBus.execute(new GetPersonQuery());
  }
}
