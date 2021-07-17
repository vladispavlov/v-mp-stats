import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServersOnlineDocument = ServersOnline & Document;

@Schema()
export class ServersOnline {
  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const ServersOnlineSchema = SchemaFactory.createForClass(ServersOnline);
