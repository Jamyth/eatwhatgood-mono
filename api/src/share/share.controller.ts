import { Controller, Req } from '@nestjs/common';
import { Request } from 'express';
import { Post, Body, ReturnType, Get, Param } from 'nest-api-generator';
import { CreateQRCodeHashAJAXRequest } from './request/CreateQRCodeAJAXRequest';
import { CreateQRCodeHashAJAXResponse } from './response/CreateQRCodeHashAJAXResponse';
import { GetRestaurantByQRCodeAJAXResponse } from './response/GetRestaurantByQRCodeAJAXResponse';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
    constructor(private readonly shareService: ShareService) {}

    @Get('/:hash')
    @ReturnType(GetRestaurantByQRCodeAJAXResponse)
    getRestaurantByQRCode(@Param('hash') hash: string) {
        const restaurants = this.shareService.getRestaurants(hash);
        const response = new GetRestaurantByQRCodeAJAXResponse();
        response.restaurants = restaurants;

        return response;
    }

    @Post('/')
    @ReturnType(CreateQRCodeHashAJAXResponse)
    createQRCodeHash(@Body() request: CreateQRCodeHashAJAXRequest, @Req() req: Request) {
        const hash = this.shareService.hash(request);

        const response = new CreateQRCodeHashAJAXResponse();
        response.url = hash;

        return response;
    }
}
