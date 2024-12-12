import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../models/Person.model';
import { GetPersonQuery } from '../get-person.query';

@QueryHandler(GetPersonQuery)
export class GetPersonHandler implements IQueryHandler<GetPersonQuery> {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async execute(query: GetPersonQuery): Promise<Person | Person[]> {
    if (query.personId) {
      return this.personRepository.findOne({ 
        where: { personId: query.personId } 
      });
    }
    return this.personRepository.find();
  }
} 