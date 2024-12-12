import { CreatePersonHandler } from './create-person.handler';
import { UpdatePersonHandler } from './update-person.handler';
import { DeletePersonHandler } from './delete-person.handler';

export const CommandHandlers = [CreatePersonHandler, UpdatePersonHandler, DeletePersonHandler];
