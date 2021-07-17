import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server, ServerDocument } from './schemas/server.schema';
import { Online, OnlineDocument } from './schemas/online.schema';
import {
  ServersOnline,
  ServersOnlineDocument,
} from './schemas/serversOnline.schema';
import { HttpService } from '@nestjs/axios';
import { Interval } from '@nestjs/schedule';
import { retry, lastValueFrom } from 'rxjs';
import { ServerListResponse } from './interfaces/serverList.interface';

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(
    @InjectModel(Server.name)
    private readonly serverModel: Model<ServerDocument>,

    @InjectModel(Online.name)
    private readonly onlineModel: Model<OnlineDocument>,

    @InjectModel(ServersOnline.name)
    private readonly serversOnlineModel: Model<ServersOnlineDocument>,

    private httpService: HttpService,
  ) {
    this.update();
  }

  async getAltvServerList(): Promise<ServerListResponse[]> {
    const altvServerListUrl = 'https://api.altv.mp/servers/list';

    try {
      this.logger.debug('Request sent');
      const response = await lastValueFrom(
        this.httpService.get(altvServerListUrl).pipe(retry(3)),
      );
      this.logger.debug('Request successful');

      return response.data as ServerListResponse[];
    } catch (e) {
      this.logger.debug('Request failed');
      this.logger.error(e);
      return [];
    }
  }

  @Interval(1000 * 60 * 60) // 1 hour
  async update() {
    try {
      this.logger.debug('Update started');
      const serverList = await this.getAltvServerList();
      this.logger.debug(`Total servers to update: ${serverList.length}`);
      const onlineQueries: Online[] = [];

      for (const server of serverList) {
        const serverLastUpdate = new Date(server.lastUpdate);
        const updateQuery = {
          altvID: server.id,
          maxPlayers: server.maxPlayers,
          name: server.name,
          locked: server.locked,
          host: server.host,
          port: server.port,
          gameMode: server.gameMode,
          website: server.website,
          language: server.language,
          description: server.description,
          verified: server.verified,
          promoted: server.promoted,
          useEarlyAuth: server.useEarlyAuth,
          earlyAuthUrl: server.earlyAuthUrl,
          useCdn: server.useCdn,
          cdnUrl: server.cdnUrl,
          useVoiceChat: server.useVoiceChat,
          tags: server.tags,
          bannerUrl: server.bannerUrl,
          branch: server.branch,
          build: server.build,
          version: server.version,
          lastUpdate: serverLastUpdate,
          visibility: true,
        };
        const serverDocument = await this.serverModel
          .findOneAndUpdate({ altvID: server.id }, updateQuery, {
            new: true,
            upsert: true,
            overwrite: true,
          })
          .exec();
        onlineQueries.push({
          server: serverDocument._id,
          players: server.players,
          timestamp: serverLastUpdate,
        });
      }

      const idsOfVisibleServers = onlineQueries.map((query) => query.server);
      await this.serverModel.updateMany(
        { _id: { $nin: idsOfVisibleServers } },
        { visibility: false },
      );
      await this.onlineModel.create(onlineQueries);
      await this.serversOnlineModel.create({
        quantity: serverList.length,
        timestamp: new Date(),
      });
      this.logger.debug('Update successful');
    } catch (e) {
      this.logger.debug('Update failed');
      this.logger.error(e);
    }
  }
}
