export class PersonUpdatedEvent {
    constructor(
      public readonly personId: string,
      public readonly email: string,
      public readonly age?: number,
      public readonly address?: string,
      public readonly phoneNumber?: string,
      public readonly country?: string,
    ) {}
  }
  