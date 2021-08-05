import { Injectable, NotFoundException } from '@nestjs/common';
import HashGenerator from 'short-unique-id';
import { DateUtil, ObjectUtil } from 'jamyth-web-util';
import { Cron } from '@nestjs/schedule';
import { Restaurant } from './shared/Restaurant';
import { CreateQRCodeHashAJAXRequest } from './request/CreateQRCodeAJAXRequest';

interface Cache {
    restaurants: Restaurant[];
    expireAt: Date;
}

@Injectable()
export class ShareService {
    private readonly hashGenerator = new HashGenerator();
    private record: Record<string, Cache> = {};

    @Cron('0 1 * * *')
    autoClearCache() {
        const now = Date.now();
        const list = ObjectUtil.toArray(this.record, (hash, cache) => ({
            hash,
            ...cache,
        }));

        list.forEach((_) => {
            const timestamp = _.expireAt.getTime();
            if (now > timestamp) {
                delete this.record[_.hash];
            }
        });
    }

    hash({ restaurants }: CreateQRCodeHashAJAXRequest): string {
        const hash = this.hashGenerator.randomUUID();
        this.record[hash] = {
            restaurants,
            expireAt: DateUtil.daysAfterToday(7, 'day-end'),
        };
        return hash;
    }

    getRestaurants(hash: string): Restaurant[] {
        const cache: Cache | undefined = this.record[hash];
        if (!cache) {
            throw new NotFoundException('找不到餐廳');
        }
        return cache.restaurants;
    }
}
