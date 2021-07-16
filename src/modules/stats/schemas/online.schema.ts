import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OnlineDocument = Online & Document;

@Schema()
export class Online {
  @Prop({ required: true, index: true })
  altvID: string;

  @Prop({ required: true })
  players: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const OnlineSchema = SchemaFactory.createForClass(Online);
