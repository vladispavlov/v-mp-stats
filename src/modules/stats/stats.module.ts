import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { ServerSchema, Server } from './schemas/server.schema';
import { OnlineSchema, Online } from './schemas/online.schema';
import {
  ServersOnlineSchema,
  ServersOnline,
} from './schemas/serversOnline.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Server.name,
        useFactory: () => ServerSchema,
      },
      {
        name: Online.name,
        useFactory: () => OnlineSchema,
      },
      {
        name: ServersOnline.name,
        useFactory: () => ServersOnlineSchema,
      },
    ]),
    HttpModule,
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
