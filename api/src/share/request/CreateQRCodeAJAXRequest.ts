import { Property } from 'nest-api-generator';
import { Restaurant } from '../shared/Restaurant';

export class CreateQRCodeHashAJAXRequest {
    @Property('restaurants', Restaurant, true)
    restaurants: Restaurant[];
}
