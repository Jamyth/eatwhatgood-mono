import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { ShareModule } from './share/share.module';

@Module({
    imports: [ScheduleModule.forRoot(), ShareModule],
    controllers: [AppController],
})
export class AppModule {}
