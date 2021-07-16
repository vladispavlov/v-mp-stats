import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServerDto } from './dto/create-server.dto';
import { CreateOnlineDto } from './dto/create-online.dto';
import { Server, ServerDocument } from './schemas/server.schema';
import { Online, OnlineDocument } from './schemas/online.schema';
import { HttpService } from '@nestjs/axios';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(
    @InjectModel(Server.name)
    private readonly serverModel: Model<ServerDocument>,

    @InjectModel(Online.name)
    private readonly onlineModel: Model<OnlineDocument>,

    private schedulerRegistry: SchedulerRegistry,
    private httpService: HttpService,
  ) {}

  async createServer(createServerDto: CreateServerDto): Promise<Server> {
    const createdServer = new this.serverModel(createServerDto);
    return createdServer.save();
  }

  async createOnline(createOnlineDto: CreateOnlineDto): Promise<Online> {
    const createdOnline = new this.onlineModel(createOnlineDto);
    return createdOnline.save();
  }

  async findServer(altvID: Extract<Server, 'altvID'>): Promise<Server> {
    return this.serverModel.findOne({ altvID }).exec();
  }

  async getOnlineForServer(
    altvID: Extract<Server, 'altvID'>,
  ): Promise<Online[]> {
    return this.onlineModel.find({ altvID }).exec();
  }
}
