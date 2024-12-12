import { AggregateRoot } from '@nestjs/cqrs';

export abstract class CustomAggregateRoot extends AggregateRoot {
    protected version: number = 0;
    protected readonly _id: string;  // Usa protected para hacerlo accesible en clases derivadas

    constructor(id: string) {
        super();
        this._id = id;
    }

    // Proporcionar un getter para acceder al id de manera segura desde fuera
    get id(): string {
        return this._id;
    }

    apply(event: any, isFromHistory: boolean = false): void {
        if (!isFromHistory) {
            this.incrementVersion();
    
            // Directamente enriquecer el objeto de evento con metadatos adicionales.
            Object.assign(event, {
                aggregateRootId: this.id, // ID del agregado
                dateTime: new Date().toISOString(), // Marca de tiempo actual
                eventName: event.constructor.name, // Nombre de la clase del evento como eventName
                payload: {
                ...event,

                }
            });
    
            super.apply(event, isFromHistory);
        } else {
            super.apply(event, isFromHistory);
        }
    }

    protected incrementVersion(): void {
        this.version++;
    }

}
