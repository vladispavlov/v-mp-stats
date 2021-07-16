import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServerDocument = Server & Document;

@Schema()
export class Server {
  @Prop({ required: true, index: true })
  altvID: string;

  @Prop({ required: true })
  maxPlayers: number;

  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true })
  locked: boolean;

  @Prop({ required: true, index: true })
  host: string;

  @Prop({ required: true })
  port: number;

  @Prop({ required: true })
  gameMode: string;

  @Prop({ required: true })
  website: string;

  @Prop({ required: true })
  laguage: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  verified: boolean;

  @Prop({ required: true })
  promoted: boolean;

  @Prop({ required: true })
  useEarlyAuth: boolean;

  @Prop({ required: true })
  earlyAuthUrl: string;

  @Prop({ required: true })
  useCdn: boolean;

  @Prop({ required: true })
  cdnUrl: string;

  @Prop({ required: true })
  useVoiceChat: boolean;

  @Prop({ required: true, type: [String] })
  tags: string[];

  @Prop({ required: true })
  bannerUrl: string | null;

  @Prop({ required: true })
  branch: string;

  @Prop({ required: true })
  build: number;

  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  lastUpdate: Date;
}

export const ServerSchema = SchemaFactory.createForClass(Server);
