import { IsMongoId, IsInt, Min, IsDate } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateOnlineDto {
  @IsMongoId()
  readonly server: ObjectId;

  @IsInt()
  @Min(0)
  readonly players: number;

  @IsDate()
  readonly timestamp: Date;
}
