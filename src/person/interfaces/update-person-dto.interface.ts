import { CreatePersonDto } from "./create-person-dto.interface";

export interface UpdatePersonDto extends Partial<CreatePersonDto> {

  }