import { Property } from 'nest-api-generator';
import { Restaurant } from '../shared/Restaurant';

export class GetRestaurantByQRCodeAJAXResponse {
    @Property('restaurants', Restaurant, true)
    restaurants: Restaurant[];
}
