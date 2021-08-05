import { Property } from 'nest-api-generator';

export class Restaurant {
    @Property('name', String)
    name: string;

    @Property('district', String, true)
    district: string[];
}
