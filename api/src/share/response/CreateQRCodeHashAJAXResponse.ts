import { Property } from 'nest-api-generator';

export class CreateQRCodeHashAJAXResponse {
    @Property('url', String)
    url: string;
}
