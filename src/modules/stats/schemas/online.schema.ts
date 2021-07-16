import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Server } from './server.schema';

export type OnlineDocument = Online & Document;

@Schema()
export class Online {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Server' })
  server: Server;

  @Prop({ required: true })
  players: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const OnlineSchema = SchemaFactory.createForClass(Online);
